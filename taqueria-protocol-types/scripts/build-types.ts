import fs from 'fs/promises';
import path from 'path';

const toCamelCase = (name: string) => name.replace(/^([A-Z]+)/, m => m.toLocaleLowerCase());

export const buildTypes = async (packagePath: string) => {
	const typesFilePath = path.join(packagePath, `types.ts`);
	const outTypesStrictFilePath = path.join(packagePath, `out/types-strict.ts`);
	const outDirPath = path.join(packagePath, `out/types`);

	const typeCode = await fs.readFile(typesFilePath, { encoding: `utf-8` });
	const typeNames = [...typeCode.matchAll(/^export type ([A-Za-z0-9_]+) =/gm)].map(x => x[1]);
	console.log(`typeNames`, { typeNames });

	const generationWarning = `
// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    `.trimStart();

	const typeCodeStrict = `
${generationWarning}
${
		typeCode.replace(/^export type ([A-Za-z0-9_]+) =((?:.|\n){10})/gm, (_, typeName: string, nextText: string) => {
			const nextTextTrimmed = nextText.trim();

			// Object types
			if (nextTextTrimmed.startsWith(`{`)) {
				return `export type ${typeName} = { __type: ${typeName} } &${nextText}`;
			}

			// simple types
			if (
				nextTextTrimmed.startsWith(`string`)
				|| nextTextTrimmed.startsWith(`number`)
				|| nextTextTrimmed.startsWith(`boolean`)
			) {
				return `export type ${typeName} = { __type: ${typeName} } &${nextText}`;
			}

			// Else - Use a wrapper type
			return `export type ${typeName} = { __type: ${typeName} } & ${typeName}Raw;\ntype ${typeName}Raw =${nextText}`;
		})
	}`.trimStart();
	await fs.writeFile(outTypesStrictFilePath, typeCodeStrict);

	for (const typeName of typeNames) {
		const typeNameRaw = `${typeName}`;
		const typeNameNominal = `${typeName}`;
		const typeNameStrict = `${typeName}Strict`;
		const typeNameSchema = `${toCamelCase(typeName)}Schema`;

		const content = `
${generationWarning}
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { ${typeNameRaw} } from '@taqueria/protocol-types/types';
import { ${typeNameNominal} as ${typeNameStrict} } from '@taqueria/protocol-types/out/types-strict';
import { ${typeNameSchema} } from '@taqueria/protocol-types/out/types-zod';

export type { ${typeNameStrict} as ${typeNameNominal} };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('${typeNameRaw}');

export const from = (input: unknown): ${typeNameStrict} => {
    return ${typeNameSchema}.parse(input) as ${typeNameStrict};
};

export const create = (input: ${typeNameRaw}): ${typeNameStrict} => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ${typeNameStrict}> => {
    try {
        return resolve(${typeNameSchema}.parse(input) as ${typeNameStrict});
    } catch (previous) {
        const parseMsg = parseErrMsg(input, previous);

        const unknownMsg = unknownErrMsg(input);

        if (previous instanceof ZodError) {
            return toFutureParseErr(previous, parseMsg, input);
        }
        return toFutureParseUnknownErr(previous, unknownMsg, input);
    }
};

export const make = (input: Omit<${typeNameStrict}, '__type'>): FutureInstance<TaqError, ${typeNameStrict}> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: ${typeNameSchema},
	schema: ${typeNameSchema}.transform(val => val as ${typeNameStrict}),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = ${typeNameSchema};

export type t = ${typeNameStrict};
        `.trimStart();
		await fs.writeFile(path.join(outDirPath, `${typeName}.ts`), content);
	}
};

buildTypes(
	`taqueria-protocol-types`,
).catch(console.error);

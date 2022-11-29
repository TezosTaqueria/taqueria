import fs from 'fs/promises';
import path from 'path';

const toCamelCase = (name: string) => name.replace(/^([A-Z]+)/, m => m.toLocaleLowerCase());

const toErrorMsg = (typeName: string) => {
	switch (typeName) {
		case 'Config':
		case 'LoadedConfig':
			return 'Your .taq/config.json is invalid:';
		default:
			return `${typeName} is invalid:`;
	}
};

export const buildTypes = async (packagePath: string) => {
	const typesFilePath = path.join(packagePath, `types.ts`);
	const outTypesStrictFilePath = path.join(packagePath, `out/types-strict.ts`);
	const outDirPath = path.join(packagePath, `out/types`);
	await fs.mkdir(outDirPath, { recursive: true });

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
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ${typeNameRaw} } from '@taqueria/protocol/types';
import { ${typeNameNominal} as ${typeNameStrict} } from '@taqueria/protocol/out/types-strict';
import { ${typeNameSchema} } from '@taqueria/protocol/out/types-zod';

export type { ${typeNameStrict} as ${typeNameNominal} };

export const from = (input: unknown): ${typeNameStrict} => {
	try {
		return ${typeNameSchema}.parse(input) as ${typeNameStrict};
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["${toErrorMsg(typeName)}"],
			);
			const validationErr = msgs.join('\\n') + '\\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ${typeName}.")
	}
    
};

export const create = (input: ${typeNameRaw}): ${typeNameStrict} => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ${typeNameStrict}> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
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
	path.resolve(__dirname, '../'),
).catch(console.error);

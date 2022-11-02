import fs from 'fs/promises';
import path from 'path';

const toCamelCase = (name: string) => `${name[0].toLocaleLowerCase()}${name.substring(1)}`;

export const buildTypes = async (typesFilePath: string, outDirPath: string) => {
	const typeCode = await fs.readFile(typesFilePath, { encoding: `utf-8` });
	const typeNames = [...typeCode.matchAll(/^export type ([A-Za-z0-9_]+) =/gm)].map(x => x[1]);
	console.log(`typeNames`, { typeNames });

	for (const typeName of typeNames) {
		const content = `
// Generated file: Do not edit 
// generated from @taqueria-protocol-types
// import { ${typeName}, ${toCamelCase(typeName)}Schema, parsingErrorMessages } from '@taqueria-protocol-types';
import { ${typeName} } from '../../types';
import { parsingErrorMessages } from '../../helpers';
import { ${toCamelCase(typeName)}Schema } from '../types-zod';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

type ${typeName}Strict = ${typeName} & { __type: '${typeName}' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('${typeName}');

export const from = (input: unknown): ${typeName}Strict => {
    return ${toCamelCase(typeName)}Schema.parse(input) as ${typeName}Strict;
}

export const create = (input: ${typeName} | ${typeName}Strict): ${typeName}Strict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ${typeName}Strict> => {
    try {
        return resolve(${toCamelCase(typeName)}Schema.parse(input) as ${typeName}Strict);
    } catch (previous) {

        const parseMsg = parseErrMsg(input, previous);

        const unknownMsg = unknownErrMsg(input);

        if (previous instanceof ZodError) {
            return toFutureParseErr(previous, parseMsg, input);
        }
        return toFutureParseUnknownErr(previous, unknownMsg, input);
    }
}

export const make = (input: ${typeName}Strict): FutureInstance<TaqError, ${typeName}Strict> => of(input);

        `;
		await fs.writeFile(path.join(outDirPath, `${typeName}.ts`), content);
	}
};

buildTypes(`taqueria-protocol-types/types.ts`, `taqueria-protocol-types/out/typelist`).catch(console.error);

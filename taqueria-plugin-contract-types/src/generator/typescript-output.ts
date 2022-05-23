import { assertExhaustive, GenerateApiError, reduceFlatMap } from './common';
import { TypedStorage, TypedMethod, TypedType, TypedVar } from './contract-parser';

export type TypescriptCodeOutput = {
    typesFileContent: string;
    contractCodeFileContent: string;
    storage: string;
    methods: string;
    methodsObject: string;
};

export type TypeAliasData = {
    mode: 'local',
    fileContent?: string,
} | {
    mode: 'file' | 'library',
    importPath?: string,
} | {
    mode: 'simple',
};
export type TypeUtilsData = {
    importPath: string,
};

export const createTypescriptCodeGenerator = (options?: { mode?: 'types' | 'defaultValue' }) => {
    type TypeAlias = { aliasType: string, simpleTypeDefinition: string, simpleTypeImports?: { name: string, isDefault?: boolean, from: string }[] };
    const usedStrictTypes = [] as TypeAlias[];
    const addTypeAlias = (strictType: TypeAlias) => {
        if (!usedStrictTypes.some(x => x.aliasType === strictType.aliasType)) {
            usedStrictTypes.push(strictType);
        }
    };

    // Not really tabs :)
    const tabs = (indent: number) => Array(indent).fill(`    `).join(``);
    const toIndentedItems = (indent: number, delimeters: { afterItem?: string, beforeItem?: string }, items: string[]) => {
        return `
${tabs(indent + 1)}${items.join(`${delimeters.afterItem ?? ``}
${tabs(indent + 1)}${delimeters.beforeItem ?? ``}`)}
${tabs(indent)}`;
    };

    const typeToCode = (t: TypedType, indent: number): string => {
        if (options?.mode === 'defaultValue') {
            return typeToCode_defaultValue(t, indent);
        }

        if (t.kind === `value`) {
            // return `${t.typescriptType}`;

            const prim = `prim` in t.raw ? t.raw.prim : `unknown`;

            // Strict mode
            if (t.typescriptType === `boolean`
                || t.typescriptType === `string` && prim === `string`
            ) {
                return `${t.typescriptType}`;
            }

            if (t.typescriptType === 'number') {
                const simpleBaseType = `string | BigNumber | number`;
                const typeAlias: TypeAlias = { aliasType: prim, simpleTypeDefinition: `type ${prim} = ${simpleBaseType};`, simpleTypeImports: [{ name: 'BigNumber', isDefault: true, from: 'bignumber.js' }] };
                addTypeAlias(typeAlias);

                return typeAlias.aliasType;
            }

            const simpleBaseType = t.typescriptType === 'Date' ? 'Date | string' : t.typescriptType;
            const typeAlias: TypeAlias = { aliasType: prim, simpleTypeDefinition: `type ${prim} = ${simpleBaseType};` };
            addTypeAlias(typeAlias);

            return typeAlias.aliasType;
        }
        if (t.kind === `array`) {
            return `Array<${typeToCode(t.array.item, indent)}>`;
        }
        if (t.kind === `map`) {

            const typeAlias: TypeAlias = t.map.isBigMap
                ? { aliasType: `BigMap`, simpleTypeDefinition: 'type BigMap<K, T> = MichelsonMap<K, T>;', simpleTypeImports: [{ name: 'MichelsonMap', from: '@taquito/taquito' }] }
                : { aliasType: `MMap`, simpleTypeDefinition: 'type MMap<K, T> = MichelsonMap<K, T>;', simpleTypeImports: [{ name: 'MichelsonMap', from: '@taquito/taquito' }] };
            addTypeAlias(typeAlias);

            return `${typeAlias.aliasType}<${typeToCode(t.map.key, indent)}, ${typeToCode(t.map.value, indent)}>`;
        }
        if (t.kind === `object`) {
            return `{${toIndentedItems(indent, {},
                t.fields.map((a, i) => varToCode(a, i, indent + 1) + `;`),
            )}}`;
        }
        if (t.kind === `union`) {

            const getUnionItem = (a: TypedVar, i: number) => {
                const itemCode = `${varToCode(a, i, indent + 1)}`;

                // Keep on single line if already on single line
                if (!itemCode.includes(`\n`)) {
                    return `{ ${itemCode} }`;
                }

                // Indent if multi-line (and remake with extra indent)
                return `{${toIndentedItems(indent + 1, {}, [`${varToCode(a, i, indent + 2)}`])}}`;
            };

            return `(${toIndentedItems(indent, { beforeItem: `| ` },
                t.union.map(getUnionItem),
            )})`;
        }
        if (t.kind === `unit`) {
            const typeAlias: TypeAlias = { aliasType: `unit`, simpleTypeDefinition: `type unit = (true | undefined);`, };
            addTypeAlias(typeAlias);
            return typeAlias.aliasType;
        }
        if (t.kind === `never`) {
            return `never`;
        }
        if (t.kind === `unknown`) {
            return `unknown`;
        }

        assertExhaustive(t, `Unknown type`);
        throw new GenerateApiError(`Unknown type node`, { t });
    };

    const typeToCode_defaultValue = (t: TypedType, indent: number): string => {
        if (t.kind === `value`) {
            // return `${t.typescriptType}`;

            const prim = `prim` in t.raw ? t.raw.prim : `unknown`;

            // Strict mode
            if (t.typescriptType === 'boolean') {
                return `true`;
            }
            if (t.typescriptType === `string` && prim === `string`) {
                return `'VALUE'`;
            }
            if (t.typescriptType === 'number') {
                return `tas.${prim}('42')`;
            }
            if (t.typescriptType === 'Date') {
                return `tas.timestamp(new Date())`;
            }
            if (prim === 'address'
                || prim === 'contract') {
                return `tas.${prim}('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456')`;
            }
            if (prim === 'bytes') {
                return `tas.${prim}(char2Bytes('DATA'))`;
            }
            if (t.typescriptType === 'string') {
                return `tas.${prim}('VALUE')`;
            }
            assertExhaustive(t.typescriptType, `Unknown value type`);

            return prim;
        }
        if (t.kind === `array`) {
            return `[${typeToCode(t.array.item, indent)}]`;
        }
        if (t.kind === `map`) {
            const keyPrim = `prim` in t.map.key.raw ? t.map.key.raw.prim : `unknown`;
            const isStringBasedKey = t.map.key.kind === 'value' && keyPrim === 'string';
            if (isStringBasedKey) {
                return `tas.${t.map.isBigMap ? 'bigMap' : 'map'}({ 
${tabs(indent + 1)}${typeToCode(t.map.key, indent)}: ${typeToCode(t.map.value, indent)},
${tabs(indent)}})`;
            }

            return `tas.${t.map.isBigMap ? 'bigMap' : 'map'}([{ 
${tabs(indent + 1)}key: ${typeToCode(t.map.key, indent)}, 
${tabs(indent + 1)}value: ${typeToCode(t.map.value, indent)},
${tabs(indent)}}])`;
        }
        if (t.kind === `object`) {
            const delimeter = options?.mode === 'defaultValue' ? ',' : `;`;
            return `{${toIndentedItems(indent, {},
                t.fields.map((a, i) => varToCode(a, i, indent + 1) + delimeter),
            )}}`;
        }
        if (t.kind === `union`) {

            const getUnionItem = (a: TypedVar, i: number) => {
                const itemCode = `${varToCode(a, i, indent + 1)}`;

                // Keep on single line if already on single line
                if (!itemCode.includes(`\n`)) {
                    return `{ ${itemCode} }`;
                }

                // Indent if multi-line (and remake with extra indent)
                return `{${toIndentedItems(indent + 1, {}, [`${varToCode(a, i, indent + 2)}`])}}`;
            };

            return `(${toIndentedItems(indent, { beforeItem: `| ` },
                t.union.map(getUnionItem),
            )})`;
        }
        if (t.kind === `unit`) {
            return `undefined`;
        }
        if (t.kind === `never`) {
            return `never`;
        }
        if (t.kind === `unknown`) {
            return `unknown`;
        }

        assertExhaustive(t, `Unknown type`);
        throw new GenerateApiError(`Unknown type node`, { t });
    };

    const varToCode = (t: TypedVar, i: number, indent: number, numberVarNamePrefix = ''): string => {
        return `${t.name ?? `${numberVarNamePrefix}${i}`}${t.type.optional ? `?` : ``}: ${typeToCode(t.type, indent)}`;
    };

    const argsToCode = (args: TypedVar[], indent: number, asObject: boolean): string => {

        if (args.length === 1) {
            if (args[0].type.kind === `unit`) { return ``; }

            if (options?.mode === 'defaultValue') {
                return typeToCode(args[0].type, indent + 1);
            }
            return `${args[0].name ?? `param`}: ${typeToCode(args[0].type, indent + 1)}`;
        }

        const result = `${toIndentedItems(indent, {},
            args.filter(x => x.name || x.type.kind !== `unit`).map((a, i) => {
                if (!asObject && options?.mode === 'defaultValue') {
                    return typeToCode(a.type, indent + 1) + `,`;
                }
                return varToCode(a, i, indent + 1, asObject ? '' : '_') + `,`;
            }),
        )}`;

        if (asObject) {
            if (options?.mode === 'defaultValue') {
                return `{${result}}`;
            }
            return `params: {${result}}`;
        }

        return result;
    };

    return {
        usedStrictTypes,
        tabs,
        toIndentedItems,
        typeToCode,
        argsToCode,
    };
};

export const toTypescriptCode = (storage: TypedStorage, methods: TypedMethod[], contractName: string, parsedContract: unknown, protocol: { name: string, key: string }, typeAliasData: TypeAliasData, typeUtilsData: TypeUtilsData): TypescriptCodeOutput => {
    const {
        usedStrictTypes,
        toIndentedItems,
        typeToCode,
        argsToCode,
    } = createTypescriptCodeGenerator();


    const methodsToCode = (indent: number) => {
        const methodFields = methods.map(x => {
            const methodCode = `${x.name}: (${argsToCode(x.args, indent + 1, false)}) => Promise<void>;`;
            return methodCode;
        });

        const methodsTypeCode = `type Methods = {${toIndentedItems(indent, {}, methodFields)}};`;
        return methodsTypeCode;
    };
    const methodsObjectToCode = (indent: number) => {
        const methodFields = methods.map(x => {
            const methodCode = `${x.name}: (${argsToCode(x.args, indent + 1, true)}) => Promise<void>;`;
            return methodCode;
        });

        const methodsTypeCode = `type MethodsObject = {${toIndentedItems(indent, {}, methodFields)}};`;
        return methodsTypeCode;
    };

    const storageToCode = (indent: number) => {
        const storageTypeCode = `type Storage = ${typeToCode(storage.storage, indent)};`;
        return storageTypeCode;
    };

    const methodsCode = methodsToCode(0);
    const methodsObjectCode = methodsObjectToCode(0);
    const storageCode = storageToCode(0);

    // Simple type aliases
    const simpleTypeMappingImportsAll = new Map(usedStrictTypes.map(x => x.simpleTypeImports ?? []).reduce(reduceFlatMap, []).map(x => [`${x?.from}:${x?.name}:${x?.isDefault}`, x]));
    const simpleTypeMappingImportsFrom = [...simpleTypeMappingImportsAll.values()].reduce((out, x) => {
        const entry = out[x.from] ?? (out[x.from] = { names: [] });
        if (x.isDefault) {
            entry.default = x.name;
        } else {
            entry.names.push(x.name);
        }
        entry.names.sort((a, b) => a.localeCompare(b));
        return out;
    }, {} as { [from: string]: { names: string[], default?: string } });

    const simpleTypeMappingImportsText = Object.keys(simpleTypeMappingImportsFrom)
        .map(k => {
            const entry = simpleTypeMappingImportsFrom[k];
            const items = [entry.default, entry.names.length ? `{ ${entry.names.join(', ')} }` : ''].filter(x => x);
            return `import ${items.join(', ')} from '${k}';\n`;
        })
        .join('');

    const simpleTypeMapping = usedStrictTypes
        .sort((a, b) => a.aliasType.localeCompare(b.aliasType))
        .map(x => x.simpleTypeDefinition).join(`\n`);

    const typeUtilsDefinitions =
        `import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from '${typeUtilsData.importPath}';`;

    const typeAliasesDefinitions =
        typeAliasData.mode === 'simple' ? `${simpleTypeMappingImportsText}${simpleTypeMapping}`
            : typeAliasData.mode === 'local' ? typeAliasData.fileContent
                : `import { ${usedStrictTypes.map(x => x.aliasType).join(`, `)} } from '${typeAliasData.importPath}';`;

    const contractTypeName = `${contractName}ContractType`;
    const walletTypeName = `${contractName}WalletType`;
    const codeName = `${contractName}Code`;

    const typesFileContent = `
${typeUtilsDefinitions}
${typeAliasesDefinitions}

${storageCode}

${methodsCode}

${methodsObjectCode}

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: '${codeName}', protocol: string, code: object[] } };
export type ${contractTypeName} = ContractAbstractionFromContractType<contractTypes>;
export type ${walletTypeName} = WalletContractAbstractionFromContractType<contractTypes>;
`;

    const contractCodeFileContent = `
export const ${codeName}: { __type: '${codeName}', protocol: string, code: object[] } = {
    __type: '${codeName}',
    protocol: '${protocol.key}',
    code: JSON.parse(\`${JSON.stringify(parsedContract)}\`)
};
`;
    return {
        typesFileContent,
        contractCodeFileContent,
        storage: storageCode,
        methods: methodsCode,
        methodsObject: methodsObjectCode,
    };

};



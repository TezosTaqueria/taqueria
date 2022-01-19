var $2OpfP$taqueriasdk = require("taqueria-sdk");
var $2OpfP$fastglob = require("fast-glob");
var $2OpfP$path = require("path");
var $2OpfP$fs = require("fs");
var $2OpfP$util = require("util");
var $2OpfP$taquitomichelcodec = require("@taquito/michel-codec");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}






const $86a63c409e46a674$export$bd8d1d28710832a7 = (text)=>text.replace(/[^A-Za-z0-9]/g, '_').split("_").filter((x)=>x
    ).map((x)=>x[0].toUpperCase() + x.substring(1)
    ).join('')
;



class $832c2c280611fcb3$export$d214d56e7a53a664 {
    constructor(message1, data){
        this.message = message1;
        this.data = data;
        this.name = `GenerateApiError`;
        console.error(`❌ GenerateApiError: ${message1}`, data);
    }
}
const $832c2c280611fcb3$export$16bf6fe03653420f = (value, message)=>{
    console.error(message, {
        value: value
    });
};
const $832c2c280611fcb3$export$37679993c4e6bc41 = (out, x)=>{
    out.push(...x);
    return out;
} // const reduceFlatMapTest = () => {
 //     const items = [['a'], ['b']];
 //     const itemsFlat = items.reduce(reduceFlatMap);
 // };
;



const $1d117ae52bf607e8$var$toDebugSource = (node)=>{
    return JSON.stringify(node);
};
const $1d117ae52bf607e8$export$cc65da7b09dcddd7 = (storage)=>{
    const fields = storage.args.map((x)=>$1d117ae52bf607e8$var$visitVar(x)
    ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, []);
    const fieldsSimple = fields.length === 1 && !fields[0].name && fields[0].type.kind === 'object' ? fields[0].type.fields : fields;
    return {
        storage: {
            kind: `object`,
            raw: storage,
            fields: fieldsSimple
        }
    };
};
const $1d117ae52bf607e8$export$5c00959a6ba200c1 = (parameter)=>{
    return {
        methods: parameter.args.map((x)=>$1d117ae52bf607e8$var$visitContractParameterEndpoint(x)
        ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, [])
    };
};
const $1d117ae52bf607e8$var$visitContractParameterEndpoint = (node)=>{
    // console.log('visitContractParameterEndpoint', { node });
    // Sub endpoints (i.e. admin endpoints that are imported)
    if (node.prim === `or`) return node.args.map((x)=>$1d117ae52bf607e8$var$visitContractParameterEndpoint(x)
    ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, []);
    // Sub endpoints as a list with a single or (i.e. admin endpoints that are imported)
    if (node.prim === `list` && node.args.length === 1 && node.args[0]?.prim === `or`) return node.args.map((x)=>$1d117ae52bf607e8$var$visitContractParameterEndpoint(x)
    ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, []);
    const nameRaw = node.annots?.[0];
    const name = nameRaw?.startsWith('%') ? nameRaw.substr(1) : null;
    if (!name) {
        console.warn(`Unknown method: ${node.prim}`, {
            node: node,
            args: node.args
        });
        return [];
    }
    const nodeType = $1d117ae52bf607e8$var$visitType(node, {
        ignorePairName: node.prim === 'pair'
    });
    // Method args are usually objects
    if (nodeType.kind === 'object') return [
        {
            name: name,
            args: nodeType.fields
        }
    ];
    // Simple methods can have a single unnamed argument
    return [
        {
            name: name,
            args: [
                {
                    type: nodeType
                }
            ]
        }
    ];
};
const $1d117ae52bf607e8$var$visitVar = (node)=>{
    const name = `annots` in node && node.annots?.length === 1 ? node.annots[0].substr(1) : undefined;
    const type = $1d117ae52bf607e8$var$visitType(node);
    return [
        {
            name: name,
            type: type
        }
    ];
};
const $1d117ae52bf607e8$var$visitType = (node, options)=>{
    // console.log('visitType', { node });
    // const debug_source = toDebugSource(node);
    // if (typeof node === `string`) {
    //     return { kind: `value`, raw: node, value: node, typescriptType: `string` };
    // }
    if (!(`prim` in node)) {
        // Unknown
        console.error(`visitType no prim`, {
            node: node
        });
        return {
            kind: `unknown`,
            raw: node
        };
    }
    // Union
    if (node.prim === `or`) {
        const unionVars = node.args.map((x)=>$1d117ae52bf607e8$var$visitVar(x)
        ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, []).map((x)=>x
        );
        // Flatten with child unions
        const union = unionVars.map((x)=>!x.name && x.type.kind === 'union' ? x.type.union : [
                x
            ]
        ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, []);
        // const union = unionVars.map(x=>x.type);
        // const union = unionVars.map(x => x.type);
        // Flatten with child unions
        // const rightSide = union[1];
        // if (rightSide.kind === `union`) {
        //     union.pop();
        //     union.push(...rightSide.union);
        // }
        if (union.some((x)=>!x
        )) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`or: Some fields are null`, {
            node: node
        });
        return {
            kind: `union`,
            raw: node,
            union: union
        };
    }
    // Intersect
    if (node.prim === `pair`) {
        const fields = node.args.map((x)=>$1d117ae52bf607e8$var$visitVar(x)
        ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, []);
        if (fields.some((x)=>!x
        )) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`pair: Some fields are null`, {
            node: node,
            args: node.args,
            fields: fields
        });
        if (fields.length !== 2) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`pair: Expected 2 items`, {
            node: node,
            length: fields.length,
            fields: fields
        });
        // Flatten with unnamed child pairs
        const fieldsFlat = fields.map((x)=>(!x.name || options?.ignorePairName) && x.type.kind === 'object' ? x.type.fields : [
                x
            ]
        ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, []);
        return {
            kind: `object`,
            raw: node,
            fields: fieldsFlat
        };
    }
    // list
    if (node.prim === `list` || node.prim === `set`) {
        if (node.args.length !== 1) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`list does not have 1 arg`, {
            node: node,
            args: node.args
        });
        const arrayItem = $1d117ae52bf607e8$var$visitType(node.args[0]);
        if (!arrayItem) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`arrayItem are null`, {
            node: node,
            args: node.args,
            arrayItem: arrayItem
        });
        return {
            kind: `array`,
            raw: node,
            array: {
                item: arrayItem
            }
        };
    }
    // map
    if (node.prim === `map` || node.prim === `big_map`) {
        if (node.args.length !== 2) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`map does not have 2 args`, {
            node: node,
            args: node.args
        });
        const mapKey = $1d117ae52bf607e8$var$visitType(node.args[0]);
        const mapValue = $1d117ae52bf607e8$var$visitType(node.args[1]);
        if (!mapKey || !mapValue) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`map is missing key or value`, {
            node: node,
            args: node.args,
            mapKey: mapKey,
            mapValue: mapValue
        });
        return {
            kind: `map`,
            raw: node,
            map: {
                key: mapKey,
                value: mapValue,
                isBigMap: node.prim === `big_map`
            }
        };
    }
    // option
    if (node.prim === `option`) return {
        ...$1d117ae52bf607e8$var$visitType(node.args[0]),
        optional: true
    };
    // boolean
    if (node.prim === `bool`) return {
        kind: `value`,
        raw: node,
        value: node.prim,
        typescriptType: `boolean`
    };
    // numbers
    if (node.prim === `nat` || node.prim === `int` || node.prim === `mutez`) return {
        kind: `value`,
        raw: node,
        value: node.prim,
        typescriptType: `number`
    };
    // Date
    if (node.prim === `timestamp`) return {
        kind: `value`,
        raw: node,
        value: node.prim,
        typescriptType: `Date`
    };
    // strings
    if (node.prim === `address` || node.prim === `key` || node.prim === `key_hash` || node.prim === `chain_id` || node.prim === `string` || node.prim === `signature` || node.prim === `ticket` || node.prim === `bls12_381_fr` || node.prim === `bls12_381_g1` || node.prim === `bls12_381_g2` || node.prim === `sapling_state` || node.prim === `sapling_transaction` || node.prim === `contract`) return {
        kind: `value`,
        raw: node,
        value: node.prim,
        typescriptType: `string`
    };
    // void
    if (node.prim === `unit`) return {
        kind: `unit`,
        raw: node
    };
    // bytes?
    if (node.prim === `bytes`) return {
        kind: `value`,
        raw: node,
        value: node.prim,
        typescriptType: `string`
    };
    // misc?
    if (node.prim === `lambda` || node.prim === `operation`) return {
        kind: `value`,
        raw: node,
        value: node.prim,
        typescriptType: `string`
    };
    // chest
    if (node.prim === 'chest') throw new Error('Not Implemented: chest');
    if (node.prim === 'chest_key') throw new Error('Not Implemented: chest_key');
    // never
    if (node.prim === `never`) return {
        kind: `never`,
        raw: node
    };
    // Unknown
    $832c2c280611fcb3$export$16bf6fe03653420f(node, `Unknown type`);
    throw new $832c2c280611fcb3$export$d214d56e7a53a664(`Unknown type`, {
        node: node
    });
};



const $00d1ab297b93ca91$export$eb0413f5ee90780 = (methods)=>{
    const getSchemaObjectType = (vars)=>{
        // console.log('getSchemaObjectType', { vars });
        if (vars.some((x)=>!x
        )) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`getSchemaObjectType has null vars`, {
            vars: vars
        });
        return vars.reduce((out, x, i)=>{
            out[x.name ?? i] = getSchemaType(x.type);
            return out;
        }, {
        });
    };
    const getSchemaType = (t)=>{
        // console.log('getSchemaType', { t });
        return ((((((t.kind === `value` && t.value ? t.value : null) ?? (t.kind === `array` && t.array ? [
            getSchemaType(t.array.item)
        ] : null)) ?? (t.kind === `map` && t.map ? [
            `map`,
            getSchemaType(t.map.key),
            getSchemaType(t.map.value)
        ] : null)) ?? (t.kind === `object` && t.fields ? getSchemaObjectType(t.fields) : null)) ?? (t.kind === `unit` ? `unit` : null)) ?? (t.kind === `never` ? `never` : null)) ?? `${t.raw}`;
    };
    const schemaMethods = methods.reduce((out, x)=>{
        // console.log('schemaMethods', { x });
        out[x.name] = {
            params: x.args.length === 1 && !x.args[0].name ? getSchemaType(x.args[0].type) : getSchemaObjectType(x.args ?? [])
        };
        return out;
    }, {
    });
    return {
        schemaMethods: schemaMethods
    };
};



const $17ce70d2368a9ed4$export$d355209543d39bc0 = (storage, methods, contractName, parsedContract, protocol, typeAliasData)=>{
    const usedStrictTypes = [];
    const addTypeAlias = (strictType)=>{
        if (!usedStrictTypes.some((x)=>x.aliasType === strictType.aliasType
        )) usedStrictTypes.push(strictType);
    };
    // Not really tabs :)
    const tabs = (indent)=>Array(indent).fill(`    `).join(``)
    ;
    const toIndentedItems = (indent, delimeters, items)=>{
        return `
${tabs(indent + 1)}${items.join(`${delimeters.afterItem ?? ``}
${tabs(indent + 1)}${delimeters.beforeItem ?? ``}`)}
${tabs(indent)}`;
    };
    const typeToCode = (t, indent)=>{
        if (t.kind === `value`) {
            // return `${t.typescriptType}`;
            const prim = `prim` in t.raw ? t.raw.prim : `unknown`;
            // Strict mode
            if (t.typescriptType === `boolean` || t.typescriptType === `string` && prim === `string`) return `${t.typescriptType}`;
            if (t.typescriptType === 'number') {
                const simpleBaseType = `string | BigNumber | number`;
                const typeAlias = {
                    aliasType: prim,
                    simpleTypeDefinition: `type ${prim} = ${simpleBaseType};`,
                    simpleTypeImports: [
                        {
                            name: 'BigNumber',
                            isDefault: true,
                            from: 'bignumber.js'
                        }
                    ]
                };
                addTypeAlias(typeAlias);
                return typeAlias.aliasType;
            }
            const simpleBaseType = t.typescriptType === 'Date' ? 'Date | string' : t.typescriptType;
            const typeAlias = {
                aliasType: prim,
                simpleTypeDefinition: `type ${prim} = ${simpleBaseType};`
            };
            addTypeAlias(typeAlias);
            return typeAlias.aliasType;
        }
        if (t.kind === `array`) return `Array<${typeToCode(t.array.item, indent)}>`;
        if (t.kind === `map`) {
            const typeAlias = t.map.isBigMap ? {
                aliasType: `BigMap`,
                simpleTypeDefinition: 'type BigMap<K, T> = MichelsonMap<K, T>;',
                simpleTypeImports: [
                    {
                        name: 'MichelsonMap',
                        from: '@taquito/taquito'
                    }
                ]
            } : {
                aliasType: `MMap`,
                simpleTypeDefinition: 'type MMap<K, T> = MichelsonMap<K, T>;',
                simpleTypeImports: [
                    {
                        name: 'MichelsonMap',
                        from: '@taquito/taquito'
                    }
                ]
            };
            addTypeAlias(typeAlias);
            return `${typeAlias.aliasType}<${typeToCode(t.map.key, indent)}, ${typeToCode(t.map.value, indent)}>`;
        }
        if (t.kind === `object`) return `{${toIndentedItems(indent, {
        }, t.fields.map((a, i)=>varToCode(a, i, indent + 1) + `;`
        ))}}`;
        if (t.kind === `union`) {
            const getUnionItem = (a, i)=>{
                const itemCode = `${varToCode(a, i, indent + 1)}`;
                // Keep on single line if already on single line
                if (!itemCode.includes(`\n`)) return `{ ${itemCode} }`;
                // Indent if multi-line (and remake with extra indent)
                return `{${toIndentedItems(indent + 1, {
                }, [
                    `${varToCode(a, i, indent + 2)}`
                ])}}`;
            };
            return `(${toIndentedItems(indent, {
                beforeItem: `| `
            }, t.union.map(getUnionItem))})`;
        }
        if (t.kind === `unit`) {
            const typeAlias = {
                aliasType: `unit`,
                simpleTypeDefinition: `type unit = (true | undefined);`
            };
            addTypeAlias(typeAlias);
            return typeAlias.aliasType;
        }
        if (t.kind === `never`) return `never`;
        if (t.kind === `unknown`) return `unknown`;
        $832c2c280611fcb3$export$16bf6fe03653420f(t, `Unknown type`);
        throw new $832c2c280611fcb3$export$d214d56e7a53a664(`Unknown type node`, {
            t: t
        });
    };
    const varToCode = (t, i, indent)=>{
        return `${t.name ?? i}${t.type.optional ? `?` : ``}: ${typeToCode(t.type, indent)}`;
    };
    const argsToCode = (args, indent)=>{
        if (args.length === 1) {
            if (args[0].type.kind === `unit`) return ``;
            return `${args[0].name ?? `param`}: ${typeToCode(args[0].type, indent + 1)}`;
        }
        return `${toIndentedItems(indent, {
        }, args.filter((x)=>x.name || x.type.kind !== `unit`
        ).map((a, i)=>varToCode(a, i, indent + 1) + `,`
        ))}`;
    };
    const methodsToCode = (indent)=>{
        const methodFields = methods.map((x)=>{
            const methodCode = `${x.name}: (${argsToCode(x.args, indent + 1)}) => Promise<void>;`;
            return methodCode;
        });
        const methodsTypeCode = `type Methods = {${toIndentedItems(indent, {
        }, methodFields)}};`;
        return methodsTypeCode;
    };
    const storageToCode = (indent)=>{
        const storageTypeCode = `type Storage = ${typeToCode(storage.storage, indent)};`;
        return storageTypeCode;
    };
    const methodsCode = methodsToCode(0);
    const storageCode = storageToCode(0);
    // Simple type aliases
    const simpleTypeMappingImportsAll = new Map(usedStrictTypes.map((x)=>x.simpleTypeImports ?? []
    ).reduce($832c2c280611fcb3$export$37679993c4e6bc41, []).map((x)=>[
            `${x?.from}:${x?.name}:${x?.isDefault}`,
            x
        ]
    ));
    const simpleTypeMappingImportsFrom = [
        ...simpleTypeMappingImportsAll.values()
    ].reduce((out, x)=>{
        const entry = out[x.from] ?? (out[x.from] = {
            names: []
        });
        if (x.isDefault) entry.default = x.name;
        else entry.names.push(x.name);
        entry.names.sort((a, b)=>a.localeCompare(b)
        );
        return out;
    }, {
    });
    const simpleTypeMappingImportsText = Object.keys(simpleTypeMappingImportsFrom).map((k)=>{
        const entry = simpleTypeMappingImportsFrom[k];
        const items = [
            entry.default,
            entry.names.length ? `{ ${entry.names.join(', ')} }` : ''
        ].filter((x)=>x
        );
        return `import ${items.join(', ')} from '${k}';\n`;
    }).join('');
    const simpleTypeMapping = usedStrictTypes.sort((a, b)=>a.aliasType.localeCompare(b.aliasType)
    ).map((x)=>x.simpleTypeDefinition
    ).join(`\n`);
    const typeAliasesDefinitions = typeAliasData.mode === 'simple' ? `${simpleTypeMappingImportsText}${simpleTypeMapping}` : typeAliasData.mode === 'local' ? typeAliasData.fileContent : `import { ${usedStrictTypes.map((x)=>x.aliasType
    ).join(`, `)} } from '${typeAliasData.importPath}';`;
    const contractTypeName = `${contractName}ContractType`;
    const codeName = `${contractName}Code`;
    const typesFileContent = `
${typeAliasesDefinitions}

${storageCode}

${methodsCode}

export type ${contractTypeName} = { methods: Methods, storage: Storage, code: { __type: '${codeName}', protocol: string, code: object[] } };
`;
    const contractCodeFileContent = `
export const ${codeName}: { __type: '${codeName}', protocol: string, code: object[] } = {
    __type: '${codeName}',
    protocol: '${protocol.key}',
    code: JSON.parse(\`${JSON.stringify(parsedContract)}\`)
};
`;
    return {
        typesFileContent: typesFileContent,
        contractCodeFileContent: contractCodeFileContent,
        storage: storageCode,
        methods: methodsCode
    };
};


const $1daed9670aa8a178$var$parseContractWithMinimalProtocolLevel = (contractScript, format, contractLevelIndex)=>{
    const contractLevels = [
        {
            name: 'PsDELPH1',
            key: $2OpfP$taquitomichelcodec.Protocol.PsDELPH1
        },
        {
            name: 'PtEdo2Zk',
            key: $2OpfP$taquitomichelcodec.Protocol.PtEdo2Zk
        },
        {
            name: 'PsFLorena',
            key: $2OpfP$taquitomichelcodec.Protocol.PsFLorena
        }, 
    ];
    const protocol = contractLevels[contractLevelIndex];
    if (!protocol) throw new $832c2c280611fcb3$export$d214d56e7a53a664(`Could not parse contract script`, contractScript);
    const p = new $2OpfP$taquitomichelcodec.Parser({
        protocol: protocol.key
    });
    try {
        const contract = format === 'tz' ? p.parseScript(contractScript) : p.parseJSON(JSON.parse(contractScript));
        if (contract) return {
            contract: contract,
            protocol: protocol
        };
    } catch  {
    // Ignore parse errors
    }
    // Try again with next level
    return $1daed9670aa8a178$var$parseContractWithMinimalProtocolLevel(contractScript, format, contractLevelIndex + 1);
};
const $1daed9670aa8a178$export$adc4e820bbd3332 = (contractScript, contractName, format, typeAliasData)=>{
    const p = new $2OpfP$taquitomichelcodec.Parser({
        protocol: $2OpfP$taquitomichelcodec.Protocol.PsFLorena
    });
    const { contract: contract , protocol: protocol  } = $1daed9670aa8a178$var$parseContractWithMinimalProtocolLevel(contractScript, format, 0);
    const contractStorage = contract.find((x)=>x.prim === `storage`
    );
    const contractParameter = contract.find((x)=>x.prim === `parameter`
    );
    const storageResult = contractStorage && $1d117ae52bf607e8$export$cc65da7b09dcddd7(contractStorage);
    const storage = storageResult ?? {
        storage: {
            kind: `object`,
            raw: {
                prim: `never`
            },
            fields: []
        }
    };
    const parameterResult = contractParameter && $1d117ae52bf607e8$export$5c00959a6ba200c1(contractParameter);
    const methods = parameterResult?.methods ?? [];
    const schemaOutput = $00d1ab297b93ca91$export$eb0413f5ee90780(methods);
    const typescriptCode = $17ce70d2368a9ed4$export$d355209543d39bc0(storage, methods, contractName, contract, protocol, typeAliasData);
    return {
        schema: schemaOutput,
        typescriptCodeOutput: typescriptCode,
        parsedContract: contract,
        minimalProtocol: protocol.key
    };
};


const $80b07c9b35f59610$export$4bf5db15180664ad = `
import { BigNumber } from 'bignumber.js';
import { MichelsonMap } from '@taquito/taquito';

export type unit = (true | undefined) & { __type: 'unit' };

export type address = string & { __type: 'address' };
export type bytes = string & { __type: 'bytes' };
export type contract = string & { __type: 'contract' };
export type operation = string & { __type: 'operation' };
export type key = string & { __type: 'key' };
export type key_hash = string & { __type: 'key_hash' };
export type signature = string & { __type: 'signature' };
export type ticket = string & { __type: 'ticket' };

export type timestamp = string & { __type: 'timestamp' };

export type int = BigNumber & { __type: 'int' };
export type nat = BigNumber & { __type: 'nat' };

export type mutez = BigNumber & { __type: 'mutez' };
export type tez = BigNumber & { __type: 'tez' };

export type MMap<K, V> = Omit<MichelsonMap<K, V>, 'get'> & { get: (key: K) => V };
export type BigMap<K, V> = Omit<MichelsonMap<K, V>, 'get'> & { get: (key: K) => Promise<V> };


const createStringTypeTas = <T extends string>() => {
    return (value: string): T => value as T;
};

const createBigNumberTypeTas = <T extends BigNumber>() => {
    return (value: number | BigNumber | string): T => new BigNumber(value) as T;
};

type asMapParamOf<K, V> = K extends string ? { [key: string]: V } | Array<{ key: K, value: V }>
    : K extends number ? { [key: number]: V } | Array<{ key: K, value: V }>
    : Array<{ key: K, value: V }>;

function asMap<K, V>(value: asMapParamOf<K, V>): MMap<K, V> {
    const m = new MichelsonMap<K, V>();
    if (Array.isArray(value)) {
        const vArray = value as Array<{ key: K, value: V }>;
        vArray.forEach(x => m.set(x.key, x.value));
    } else {
        const vObject = value as { [key: string]: V };
        Object.keys(vObject).forEach(key => m.set(key as unknown as K, vObject[key]));
    }
    return m as MMap<K, V>;
}
const asBigMap = <K, V>(value: asMapParamOf<K, V>) => asMap(value) as unknown as BigMap<K, V>;

function add<T extends BigNumber>(a: T, b: T): T {
    return a.plus(b) as T;
}
function subtract<T extends BigNumber>(a: T, b: T): T {
    return a.minus(b) as T;
}

/** tas: Tezos 'as' casting for strict types */
export const tas = {
    address: createStringTypeTas<address>(),
    bytes: createStringTypeTas<bytes>(),
    contract: createStringTypeTas<contract>(),
    timestamp: (value: string | Date): timestamp => new Date(value).toISOString() as timestamp,

    int: createBigNumberTypeTas<int>(),
    nat: createBigNumberTypeTas<nat>(),
    mutez: createBigNumberTypeTas<mutez>(),
    tez: createBigNumberTypeTas<tez>(),

    map: asMap,
    bigMap: asBigMap,

    // Operations
    add,
    subtract,

    // To number
    number: (value: string | BigNumber) => Number(value + ''),
};
`;


const $16461891ca13f9bb$var$fs = {
    mkdir: $2OpfP$util.promisify(($parcel$interopDefault($2OpfP$fs)).mkdir),
    copyFile: $2OpfP$util.promisify(($parcel$interopDefault($2OpfP$fs)).copyFile),
    readdir: $2OpfP$util.promisify(($parcel$interopDefault($2OpfP$fs)).readdir),
    readFile: $2OpfP$util.promisify(($parcel$interopDefault($2OpfP$fs)).readFile),
    writeFile: $2OpfP$util.promisify(($parcel$interopDefault($2OpfP$fs)).writeFile),
    stat: $2OpfP$util.promisify(($parcel$interopDefault($2OpfP$fs)).stat),
    exists: ($parcel$interopDefault($2OpfP$fs)).existsSync
};
const $16461891ca13f9bb$var$getAllFiles = async (rootPath, filter)=>{
    const allFiles = [];
    const getAllFilesRecursive = async (dirPath)=>{
        let files = await $16461891ca13f9bb$var$fs.readdir(dirPath, {
            withFileTypes: true
        });
        for (const f of files){
            const subPath = ($parcel$interopDefault($2OpfP$path)).resolve(dirPath, f.name);
            if (f.isDirectory()) {
                await getAllFilesRecursive(subPath);
                continue;
            }
            if (!filter(subPath)) continue;
            allFiles.push(subPath);
        }
    };
    await getAllFilesRecursive(rootPath);
    return allFiles;
};
const $16461891ca13f9bb$export$2ab4539ae1119673 = async ({ inputTzContractDirectory: inputTzContractDirectory , inputFiles: inputFiles , outputTypescriptDirectory: outputTypescriptDirectory , format: format , typeAliasMode: typeAliasMode ,  })=>{
    console.log(`Generating Types: ${($parcel$interopDefault($2OpfP$path)).resolve(inputTzContractDirectory)} => ${($parcel$interopDefault($2OpfP$path)).resolve(outputTypescriptDirectory)}`);
    const ext = '.' + format;
    const filesAll = await $16461891ca13f9bb$var$getAllFiles(inputTzContractDirectory, (x)=>x.endsWith(ext)
    );
    const files = inputFiles ? filesAll.filter((f)=>inputFiles.some((inputFile)=>f.endsWith(inputFile)
        )
    ) : filesAll;
    console.log(`Contracts Found: ${[
        ``,
        ...files
    ].join(`\n\t- `)}`);
    const typeAliasImportPath = `@taquito/contract-type-generator`;
    const typeAliasData = typeAliasMode === 'local' ? {
        mode: typeAliasMode,
        fileContent: $80b07c9b35f59610$export$4bf5db15180664ad
    } : typeAliasMode === 'file' ? {
        mode: typeAliasMode,
        importPath: `./type-aliases`
    } : typeAliasMode === 'library' ? {
        mode: typeAliasMode,
        importPath: typeAliasImportPath
    } : {
        mode: 'simple'
    };
    if (typeAliasMode === 'file') {
        // Copy the type alias file
        await $16461891ca13f9bb$var$fs.mkdir(outputTypescriptDirectory, {
            recursive: true
        });
        await $16461891ca13f9bb$var$fs.writeFile(($parcel$interopDefault($2OpfP$path)).join(outputTypescriptDirectory, './type-aliases.ts'), $80b07c9b35f59610$export$4bf5db15180664ad);
    }
    for (const fullPath of files){
        const fileRelativePath = fullPath.replace(($parcel$interopDefault($2OpfP$path)).resolve(inputTzContractDirectory), '');
        const fileName = fileRelativePath.replace(ext, '');
        const inputFilePath = ($parcel$interopDefault($2OpfP$path)).join(inputTzContractDirectory, fileRelativePath);
        const typesOutputFilePath = ($parcel$interopDefault($2OpfP$path)).join(outputTypescriptDirectory, fileRelativePath.replace(ext, `.types.ts`));
        const codeContentOutputFilePath = ($parcel$interopDefault($2OpfP$path)).join(outputTypescriptDirectory, fileRelativePath.replace(ext, `.code.ts`));
        console.log(`Processing ${fileRelativePath}...`);
        try {
            const contractTypeName = $86a63c409e46a674$export$bd8d1d28710832a7(fileName);
            const michelsonCode = await $16461891ca13f9bb$var$fs.readFile(inputFilePath, {
                encoding: `utf8`
            });
            const { typescriptCodeOutput: { typesFileContent: typesFileContent , contractCodeFileContent: contractCodeFileContent  }  } = $1daed9670aa8a178$export$adc4e820bbd3332(michelsonCode, contractTypeName, format, typeAliasData);
            // Write output (ensure dir exists)
            await $16461891ca13f9bb$var$fs.mkdir(($parcel$interopDefault($2OpfP$path)).dirname(typesOutputFilePath), {
                recursive: true
            });
            await $16461891ca13f9bb$var$fs.writeFile(typesOutputFilePath, typesFileContent);
            await $16461891ca13f9bb$var$fs.writeFile(codeContentOutputFilePath, contractCodeFileContent);
        } catch (err) {
            console.error(`❌ Could not process ${fileRelativePath}`, {
                err: err
            });
        }
    }
};


const $f2698429a4aa14ba$var$getContractAbspath = (contractFilename, parsedArgs)=>$2OpfP$path.join(parsedArgs.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`)
;
const $f2698429a4aa14ba$var$generateContractTypes = (parsedArgs)=>async (contractFilename)=>{
        const contractAbspath = $f2698429a4aa14ba$var$getContractAbspath(contractFilename, parsedArgs);
        await $16461891ca13f9bb$export$2ab4539ae1119673({
            inputTzContractDirectory: parsedArgs.artifactsDir,
            inputFiles: [
                contractAbspath
            ],
            outputTypescriptDirectory: parsedArgs.typescriptDir,
            format: 'tz',
            typeAliasMode: parsedArgs.typeAliasMode ?? 'file'
        });
        return `${contractFilename}: Types generated`;
    // TODO: Generate contract michelson
    // TODO: Generate types from michelson
    // throw new Error('Not Implemented');
    // // TODO: Should getting the default environment be provided by the SDK or the framework?
    // const currentEnv = parsedArgs.env
    //     ? (parsedArgs.env as string)
    //     : (
    //         parsedArgs.config.environment
    //             ? parsedArgs.config.environment.default
    //             : 'development'
    //     )
    // const env = parsedArgs.config.environment && parsedArgs.config.environment[currentEnv]
    //         ? parsedArgs.config.environment[currentEnv]
    //         : undefined
    // // Has storage been provided for this contract?
    // if (env && env.storage) {
    //     try {
    //         const tezos = new TezosToolkit(env.rpcUrl)
    //         const contractData = await readFile(contractAbspath, "utf-8")
    //         // TODO: Generate contract michelson
    //         // TODO: Generate types from michelson
    //         throw new Error('Not Implemented');
    //         // await importKey(tezos, env.faucet.email, env.faucet.password, env.faucet.mnemonic.join(' '), env.faucet.activation_code)
    //         // return tezos.contract.originate({
    //         //     code: contractData,
    //         //     storage: env.storage[contractFilename]
    //         // })
    //         // .then(operation => `${contractFilename}: ${operation.contractAddress}`)
    //     }
    //     catch (err) {
    //         return Promise.reject({
    //             status: 'failed',
    //             stdout: "",
    //             stderr: err
    //         })
    //     }
    // }
    // return Promise.reject({
    //     status: 'failed',
    //     stderr: `No storage configured in your configuration file for ${contractFilename}`,
    //     stdout: ""
    // })
    }
;
const $f2698429a4aa14ba$var$generateContractTypesAll = (parsedArgs)=>($parcel$interopDefault($2OpfP$fastglob))("**/*.tz", {
        cwd: parsedArgs.artifactsDir
    }).then((files)=>Promise.all(files.map($f2698429a4aa14ba$var$generateContractTypes(parsedArgs)))
    )
;
const $f2698429a4aa14ba$export$3350b7b754d5c00c = (parsedArgs)=>{
    if (!parsedArgs.typescriptDir) return Promise.reject({
        status: 'failed',
        stderr: `No typescriptDir configured`,
        stdout: ""
    });
    // WORKAROUND: Redirect console.log
    const strOutLog = [];
    const consoleLogOrig = console.log;
    console.log = (message, data)=>{
        strOutLog.push(`${message}${data ? `\n${JSON.stringify(data, null, 2)}` : ''}`);
    };
    console.log('generateTypes', {
        typescriptDir: parsedArgs.typescriptDir
    });
    // console.log = consoleLogOrig;
    // return Promise.resolve({
    //     status: 'success',
    //     stdout: `${strOutLog.join('\n')}`,
    //     stderr: ""
    // });
    const argsTyped = parsedArgs;
    const p = argsTyped.contract ? $f2698429a4aa14ba$var$generateContractTypes(argsTyped)(argsTyped.contract) : $f2698429a4aa14ba$var$generateContractTypesAll(argsTyped);
    return p.then((data)=>{
        console.log = consoleLogOrig;
        return {
            status: 'success',
            stdout: `${strOutLog.join('\n')}${Array.isArray(data) ? data.join("\n") : data}`,
            stderr: ""
        };
    });
};
const $f2698429a4aa14ba$export$7191f9b9098a3ea4 = {
    generateTypes: $f2698429a4aa14ba$export$3350b7b754d5c00c
};


$2OpfP$taqueriasdk.Plugin.create((i18n)=>({
        name: "contract-type-generator",
        schema: "1.0",
        version: "0.1",
        tasks: [
            $2OpfP$taqueriasdk.Task.create({
                task: "typegen",
                command: "typegen [contract]",
                description: "Generate types for a contract to be used with taquito",
                options: [
                    $2OpfP$taqueriasdk.Option.create({
                        shortFlag: "o",
                        flag: "typescriptDir",
                        description: "The entry point that will be compiled"
                    }),
                    $2OpfP$taqueriasdk.Option.create({
                        shortFlag: "t",
                        flag: "typeAliasMode",
                        choices: [
                            'file',
                            'simple'
                        ],
                        description: "The type aliases used in the generated types"
                    }), 
                ],
                aliases: [
                    "typegen"
                ],
                handler: "proxy"
            }), 
        ],
        proxy: $f2698429a4aa14ba$export$7191f9b9098a3ea4.generateTypes
    })
, process.argv);


//# sourceMappingURL=index.js.map

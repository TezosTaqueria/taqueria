import { TypedMethod, TypedStorage } from "./contract-parser";
import { parseContractInterface } from "./process";
import { createTypescriptCodeGenerator } from "./typescript-output";

export const createTestingCodeGenerator = ({
    contractSource,
    format,
}: {
    contractSource: string,
    format: 'tz' | 'json',
}) => {

    const {
        storage,
        methods,
    } = parseContractInterface(contractSource, format);

    const codeGenerator = createTypescriptCodeGenerator({ mode: 'defaultValue' });

    const getMethodByName = (methodName: string) => {
        const method = methods.find(x => x.name === methodName);
        if (!method) {
            throw new Error(`Failed to fine method: ${methodName}`);
        }
        return method;
    };


    return {
        storage,
        methods,
        generateMethodCall: (methodName: string) => generateMethodCall({ codeGenerator, method: getMethodByName(methodName) }),
        generateStorageAccess: (storagePath: string) => generateStorageAccess({ codeGenerator, storagePath }),
    };
};

type TypescriptCodeGenerator = ReturnType<typeof createTypescriptCodeGenerator>;
type TypedContract = {
    storage: TypedStorage;
    methods: TypedMethod[];
};

/*
    // methodsObject
    contract.methodsObject.bid(tas.nat(0));
    contract.methodsObject.configure({
        asset: [{
            fa2_address: tas.address(`tz123`),
            fa2_batch: [{
                amount: tas.nat(100),
                token_id: tas.nat(`100000000000000`),
            }],
        }],
        start_time: tas.timestamp(new Date()),
        end_time: tas.timestamp(`2020-01-01`),
        extend_time: tas.nat(10),
        min_raise: tas.mutez(10),
        min_raise_percent: tas.nat(10),
        opening_price: tas.mutez(10),
        round_time: tas.nat(10),
    });

    await (await contract.methods.bid(auctionId).send({
        mutez: true,

        // Not strictly typed yet
        // amount: tas.add(current_bid, tas.mutez(1000)),
        amount: tas.number(tas.add(current_bid, tas.mutez(1000))),
    })).confirmation(100);
*/
const generateMethodCall = ({
    codeGenerator,
    method,
    indent = 2,
    useSemicolons = true,
    contractVarName = 'contract',
    minConfirmations = 3,
}: {
    codeGenerator: TypescriptCodeGenerator,
    method: TypedMethod;
    indent?: number;
    useSemicolons?: boolean;
    contractVarName?: string;
    minConfirmations?: number;
}) => {

    const {
        tabs,
        argsToCode,
    } = codeGenerator;

    const semi = useSemicolons ? ';' : '';

    const code = `
${tabs(indent)}const ${method.name}Request = await ${contractVarName}.methodsObject.${method.name}(${argsToCode(method.args, indent + 1, true)})${semi}
${tabs(indent)}await ${method.name}Request.confirmation(${minConfirmations})${semi}
${tabs(indent)}`;

    return code;
};

/*
    const getAuctionInfo = async (id: nat) => {
        const storage = await contract.storage();

        const auctions = storage.auctions;
        const auction = await auctions.get(id);
        if (!auction) {
            throw new Error(`Auction is missing`);
        }
        return auction;
    };
*/
const generateStorageAccess = ({
    codeGenerator,
    storagePath,
    indent = 2,
    useSemicolons = true,
    contractVarName = 'contract',
    getStorageValueFunctionName,
    storageVarName = 'storage',
    storageValueVarName = 'value',
}: {
    codeGenerator: TypescriptCodeGenerator,
    /** 
     * i.e. 
     * - auctions[id] 
     * - auctions[id].highest_bidder 
     * - token_metadata[tokenId]
     * - token_metadata[tokenId].token_info['']
     * */
    storagePath: string;
    indent?: number;
    useSemicolons?: boolean;
    contractVarName?: string;
    getStorageValueFunctionName?: string;
    storageVarName?: string;
    storageValueVarName?: string;
}) => {

    const {
        tabs,
        argsToCode,
    } = codeGenerator;

    const semi = useSemicolons ? ';' : '';
    const funcName = getStorageValueFunctionName ?? `get${storagePath
        .split('.')
        .map(x => x.replace(/[^A-Za-z0-9]/g, ''))
        .map(x => `${x.substring(0, 1).toLocaleUpperCase()}${x.substring(1)}`)
        .join('')}`;

    const getStorageValueExpr = ``;

    const code = `
${tabs(indent)}const ${funcName} = async () => {
${tabs(indent + 1)}const ${storageVarName} = await ${contractVarName}.storage()${semi}
${tabs(indent + 1)}const ${storageValueVarName} = ${getStorageValueExpr}${semi}
${tabs(indent)}}${semi}`;

    return code;
};
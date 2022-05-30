import { TypedMethod, TypedStorage } from "./contract-parser";
import { parseContractInterface } from "./process";
import { createTypescriptCodeGenerator } from "./typescript-output";

type CodeGenerationFormatting = {
    indent?: number;
    useSemicolons?: boolean;
};

// export type ContractTestingCodeGeneratorFactory = {
//     /** Load the contract from it's .tz file */
//     load: (contractTzPath: string) => ContractTestingCodeGenerator;
// }
// export type ContractTestingCodeGenerator = {

//     /** Generate the required imports for the tests, like the contract types or type alias utilities */
//     generateImports: () => string;

//     /** Generate the code to setup the tezos toolkit, originate a contract (providing the default storage), wait for confirmation, and set the contract instance variable */
//     generateOrigination: (args: {
//         contractVarName?: string;
//         formatting?: CodeGenerationFormatting;
//     }) => { code: string };

//     /** Generate the code to use the contract instance to call an endpoint (providing the default params) and wait for confirmation */
//     generateMethodCall: (args: {
//         methodName: string;
//         formatting?: CodeGenerationFormatting;
//     }) => { code: string };

//     /** Generate the code to use the contract instance to get the storage value and set it to a variable */
//     generateReadStorageValue: (actualVarName: 'actualResult' | string) => string;
// }

type TypescriptCodeGenerator = ReturnType<typeof createTypescriptCodeGenerator>;
type TypedContract = {
    storage: TypedStorage;
    methods: TypedMethod[];
};

export const createTestingCodeGenerator = ({
    contractSource,
    contractFormat,
}: {
    contractSource: string,
    contractFormat: 'tz' | 'json',
}) => {

    const {
        storage,
        methods,
    } = parseContractInterface(contractSource, contractFormat);

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
        generateOrigination: ({
            contractVarName,
            formatting,
        }: {
            contractVarName?: string;
            formatting?: CodeGenerationFormatting;
        }) => generateOrigination({
            codeGenerator,
            storage,
            indent: formatting?.indent,
        }),
        generateMethodCall: ({
            methodName,
            formatting,
        }: {
            methodName: string;
            formatting?: CodeGenerationFormatting;
        }) => generateMethodCall({
            codeGenerator,
            method: getMethodByName(methodName),
            indent: formatting?.indent,
        }),
        generateStorageAccess: ({
            storagePath,
        }: {
            storagePath: string;
        }) => generateStorageAccess({
            codeGenerator,
            storagePath,
        }),
    };
};




/*
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            // Originate contract
            const origination = await Tezos.contract.originate<ContractType>({
                    code: ContractCode.code,
                    storage: tas.int(0),
            });
            const newContractResult = await origination.contract();
            const newContractAddress = newContractResult.address;
            contract = await Tezos.contract.at<ContractType>(newContractAddress);
    });
*/
const generateOrigination = ({
    codeGenerator,
    storage,
    indent = 2,
    useSemicolons = true,
    contractVarName = 'contract',
    minConfirmations = 3,
}: {
    codeGenerator: TypescriptCodeGenerator,
    storage: TypedStorage,
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
${tabs(indent)}const newContractOrigination = await Tezos.contract.originate<ContractType>({
${tabs(indent + 1)}code: ContractCode.code,
${tabs(indent + 1)}storage: ${argsToCode([{ type: storage.storage }], indent + 1, true)},
${tabs(indent)}})${semi}
${tabs(indent)}const newContractResult = await newContractOrigination.contract()${semi}
${tabs(indent)}const newContractAddress = newContractResult.address${semi}
${tabs(indent)}${contractVarName} = await Tezos.contract.at<ContractType>(newContractAddress)${semi}
${tabs(indent)}`;

    return {
        code,
    };
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
${tabs(indent)}const ${method.name}Request = await ${contractVarName}.methodsObject.${method.name}(${argsToCode(method.args, indent + 1, true)}).send()${semi}
${tabs(indent)}await ${method.name}Request.confirmation(${minConfirmations})${semi}
${tabs(indent)}`;

    return {
        code,
    };
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
    const funcName = getStorageValueFunctionName ?? `getStorageValue${storagePath
        .split('.')
        .map(x => x.replace(/[^A-Za-z0-9]/g, ''))
        .map(x => `${x.substring(0, 1).toLocaleUpperCase()}${x.substring(1)}`)
        .join('')}`;

    const getStorageValueExpr = `${storageVarName}`;

    const funcCode = `
${tabs(indent)}const ${funcName} = async () => {
${tabs(indent + 1)}const ${storageVarName} = await ${contractVarName}.storage()${semi}
${tabs(indent + 1)}const ${storageValueVarName} = ${getStorageValueExpr}${semi}
${tabs(indent + 1)}return ${storageValueVarName}${semi}
${tabs(indent)}}${semi}
`;

    return {
        getStorageValueFunctionCode: funcCode,
        getStorageValueFunctionName: funcName,
    };
};
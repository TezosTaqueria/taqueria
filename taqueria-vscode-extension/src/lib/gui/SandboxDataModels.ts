export type SandboxModel = {
	sandboxName: string;
	flextesaContainerName: string;
	sandboxState: 'Running' | 'Stopped' | undefined;
	sandBoxLevel: number | undefined;
	indexerLevel: number | undefined;

	implicitAccounts: ImplicitAccountModel[];
	smartContracts: SmartContractModel[];
};

export type ImplicitAccountModel = {};

export type SmartContractModel = {};

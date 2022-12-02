import { ___TEST___ } from '../../../taqueria-plugin-ligo/compile';

describe('testing Ligo compile.ts getContractNameForExpr', () => {
	type ExprKind = 'storage' | 'default_storage' | 'parameter';
	const { getContractNameForExpr } = ___TEST___;

	test('verify get contract name for storage type', () => {
		const exprKind: ExprKind = 'storage';
		const sourceFile = 'token.storageList.mligo';
		const contractName = getContractNameForExpr(sourceFile, exprKind);
		expect(contractName).toBe('token.mligo');
	});

	test('verify get contract name for default_storage type', () => {
		const exprKind: ExprKind = 'default_storage';
		const sourceFile = 'token.storageList.mligo';
		const contractName = getContractNameForExpr(sourceFile, exprKind);
		expect(contractName).toBe('token.mligo');
	});

	test('verify get contract name for parameter type', () => {
		const exprKind: ExprKind = 'parameter';
		const sourceFile = 'token.parameterList.mligo';
		const contractName = getContractNameForExpr(sourceFile, exprKind);
		expect(contractName).toBe('token.mligo');
	});

	test('verify get contract name fail case', () => {
		const { getContractNameForExpr } = ___TEST___;
		const sourceFile = 'IAmASourceFile';
		try {
			const exprKind: ExprKind = 'storage';
			const contractName = getContractNameForExpr(sourceFile, exprKind);
			expect(contractName).toBe('IAmASourceFile');
		} catch (err) {
			const error = err as Error;
			if (error.message) {
				expect(error.message).toContain('Something went wrong internally');
			}
		}
	});
});

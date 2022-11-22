import path from 'path';
import { VsCodeHelper } from './helpers';
import * as Util from './pure';

export type SmartContractLanguageInfo = {
	fileExtensions: string[];
	pluginName: string;
	compilerName: SmartContractCompiler;
};

export type SmartContractCompiler = 'ligo' | 'archetype' | 'smartpy';

export const smartContractLanguages: SmartContractLanguageInfo[] = [
	{
		fileExtensions: ['.mligo'],
		pluginName: '@taqueria/plugin-ligo',
		compilerName: 'ligo',
	},
	{
		fileExtensions: ['.ligo'],
		pluginName: '@taqueria/plugin-ligo',
		compilerName: 'ligo',
	},
	{
		fileExtensions: ['.religo'],
		pluginName: '@taqueria/plugin-ligo',
		compilerName: 'ligo',
	},
	{
		fileExtensions: ['.jsligo'],
		pluginName: '@taqueria/plugin-ligo',
		compilerName: 'ligo',
	},
	{
		fileExtensions: ['.py'],
		pluginName: '@taqueria/plugin-smartpy',
		compilerName: 'smartpy',
	},
	// We do not support this flavour yet
	// {
	// 	fileExtensions: ['.ts'],
	// 	pluginName: '@taqueria/plugin-smartpy',
	// 	compilerName: 'smartpy',
	// },
	{
		fileExtensions: ['.arl'],
		pluginName: '@taqueria/plugin-archetype',
		compilerName: 'archetype',
	},
];

export function getSupportedSmartContractExtensions(config: Util.TaqifiedDir | null | undefined) {
	return [
		...new Set(
			smartContractLanguages.filter(l => VsCodeHelper.isPluginInstalled(config, l.pluginName))
				.flatMap(l => l.fileExtensions),
		),
	];
}

export function getLanguageInfoForFileName(fileName: string): SmartContractLanguageInfo | undefined {
	return getLanguageInfoForFileExtension(path.extname(fileName));
}

export function getLanguageInfoForFileExtension(extension: string): SmartContractLanguageInfo | undefined {
	return smartContractLanguages.find(info => info.fileExtensions.indexOf(extension.toLowerCase()) !== -1);
}

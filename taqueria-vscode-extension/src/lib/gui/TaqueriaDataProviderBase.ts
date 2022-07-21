import { VsCodeHelper } from '../helpers';
import * as Util from '../pure';

export class TaqueriaDataProviderBase {
	constructor(
		protected workspaceRoot: string,
		protected helper: VsCodeHelper,
	) {}

	async getConfig(): Promise<{ config: Util.TaqifiedDir | null; pathToDir: Util.PathToDir | null }> {
		if (!this.workspaceRoot) {
			return {
				pathToDir: null,
				config: null,
			};
		} else {
			try {
				const pathToDir = await Util.makeDir(this.workspaceRoot, this.helper.i18n);
				const config = await Util.TaqifiedDir.create(pathToDir, this.helper.i18n);
				return {
					config,
					pathToDir,
				};
			} catch (e: any) {
				await this.helper.notifyAndLogError('Error while loading config, sandboxes list will fail to populate', e);
				return {
					pathToDir: null,
					config: null,
				};
			}
		}
	}

	getEnvironmentNames(config: Util.TaqifiedDir): string[] {
		if (!config?.config?.environment) {
			return [];
		}
		const environments = Object.entries(config.config.environment);
		const nonDefaultEnvironments = environments.filter(environment => environment[0] !== 'default');
		nonDefaultEnvironments.sort((a, b) => a[0].localeCompare(b[0]));
		return nonDefaultEnvironments.map(e => e[0]);
	}

	getSandboxNames(config: Util.TaqifiedDir): string[] {
		if (!config?.config?.sandbox) {
			return [];
		}
		const sandboxes = Object.entries(config.config.sandbox);
		sandboxes.sort((a, b) => a[0].localeCompare(b[0]));
		return sandboxes.map(sandbox => sandbox[0]);
	}
}

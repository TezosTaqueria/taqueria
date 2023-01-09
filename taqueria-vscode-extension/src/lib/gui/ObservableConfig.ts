import * as rxjs from 'rxjs';
import { VsCodeHelper } from '../helpers';
import { OutputLevels } from '../LogHelper';
import * as Util from '../pure';

export type ConfigInfo = {
	config: Util.TaqifiedDir | undefined;
	pathToDir: Util.PathToDir | undefined;
};

export class ObservableConfig {
	configObservable = new rxjs.BehaviorSubject<ConfigInfo>({ config: undefined, pathToDir: undefined });
	private _currentConfig: ConfigInfo = {
		config: undefined,
		pathToDir: undefined,
	};

	get currentConfig() {
		return this._currentConfig;
	}

	private set currentConfig(value: ConfigInfo) {
		this._currentConfig = value;
		this.configObservable.next(value);
		this.helper.logHelper.showLog(
			OutputLevels.trace,
			`New config is loaded: ${JSON.stringify(this._currentConfig, null, 2)}`,
		);
	}

	private constructor(private helper: VsCodeHelper) {
		if (!this.helper.taqFolderWatcher || !this.helper.configWatcher || !this.helper.stateWatcher) {
			this.helper.logHelper.showLog(OutputLevels.warn, "Helper's watchers are not yet created");
		}
	}

	public static async create(helper: VsCodeHelper): Promise<ObservableConfig> {
		const observableConfig = new ObservableConfig(helper);
		await observableConfig.loadConfig();
		return observableConfig;
	}

	async loadConfig(): Promise<void> {
		this.helper.logHelper.showLog(OutputLevels.trace, `New Config Load started for path:`);
		const mainFolder = this.helper.getMainWorkspaceFolder();
		this.helper.logHelper.showLog(OutputLevels.trace, `${mainFolder}`);
		if (!mainFolder) {
			this.helper.logHelper.showLog(OutputLevels.warn, `Current working folder is empty.`);
			this.currentConfig = {
				pathToDir: undefined,
				config: undefined,
			};
		} else {
			let pathToDir: Util.PathToDir | undefined = undefined;
			try {
				pathToDir = await Util.makeDir(mainFolder.fsPath, this.helper.i18n);
				const config = await Util.TaqifiedDir.create(pathToDir, this.helper.i18n);
				this.currentConfig = {
					config,
					pathToDir,
				};
			} catch (e: any) {
				await this.helper.notifyAndLogError('Error while loading config, sandboxes list will fail to populate', e);
				this.currentConfig = {
					pathToDir: pathToDir,
					config: undefined,
				};
			}
		}
	}
}

import * as rxjs from 'rxjs';
import { VsCodeHelper } from '../helpers';
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
	}

	private constructor(private helper: VsCodeHelper) {
		const projectDir = helper.getMainWorkspaceFolder();
		if (!projectDir) {
			return;
		}
		this.helper.taqFolderWatcher?.onDidChange(async () => this.loadConfig());
		this.helper.taqFolderWatcher?.onDidCreate(async () => this.loadConfig());
		this.helper.taqFolderWatcher?.onDidDelete(async () => this.loadConfig());

		this.helper.configWatcher?.onDidChange(async () => this.loadConfig());
		this.helper.configWatcher?.onDidCreate(async () => this.loadConfig());
		this.helper.configWatcher?.onDidDelete(async () => this.loadConfig());

		this.helper.stateWatcher?.onDidChange(async () => this.loadConfig());
		this.helper.stateWatcher?.onDidCreate(async () => this.loadConfig());
		this.helper.stateWatcher?.onDidDelete(async () => this.loadConfig());
	}

	public static async create(helper: VsCodeHelper): Promise<ObservableConfig> {
		const observableConfig = new ObservableConfig(helper);
		await observableConfig.loadConfig();
		return observableConfig;
	}

	async loadConfig(): Promise<void> {
		const mainFolder = this.helper.getMainWorkspaceFolder();
		if (!mainFolder) {
			this.currentConfig = {
				pathToDir: undefined,
				config: undefined,
			};
		} else {
			try {
				const pathToDir = await Util.makeDir(mainFolder.fsPath, this.helper.i18n);
				const config = await Util.TaqifiedDir.create(pathToDir, this.helper.i18n);
				this.currentConfig = {
					config,
					pathToDir,
				};
			} catch (e: any) {
				await this.helper.notifyAndLogError('Error while loading config, sandboxes list will fail to populate', e);
				this.currentConfig = {
					pathToDir: undefined,
					config: undefined,
				};
			}
		}
	}
}

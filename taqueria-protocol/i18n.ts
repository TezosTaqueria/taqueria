import i18next from 'i18next';

export interface i18n {
	__: typeof i18next.t;
}

export type t = i18n;

export default async (): Promise<i18n> => {
	// TODO: i18next is feature-rich, but rather large. Determine whether you need all of the functionality
	const i18n = {
		...await i18next.init({
			lng: 'en',
			debug: false,
			resources: {
				// TODO: Move to separate language files
				en: {
					translation: {
						'appName': 'Taqueria',
						'appDesc': 'Taqueria is an integrated environment for compiling, testing, and deploying Tezos software.',
						'versionDesc': 'Display the version number of the Taqueria program',
						'betaWarning': 'Please be advised that Taqueria is currently in BETA.',
						'configDirDesc': 'Config directory (default ./.taq)',
						'initDesc': 'Initialize a new project',
						'optInDesc': 'Opt-in to sharing anonymous usage analytics',
						'optOutDesc': 'Opt-out of sharing anonymous usage analytics',
						'initPathDesc': 'Path to your project directory',
						'workflowDesc':
							'Select a workflow to initialize your Taqueria project. Choices are (ligo|smartpy|archetype|michelson)',
						'scaffoldDesc': `Generate a new project using pre-made scaffold. Recommended for creating a new project.`,
						'scaffoldUrlDesc': 'Alias or Url for the scaffold project',
						'scaffoldProjectDirDesc': 'Path where to create the new project. This must be a new directory.',
						'scaffoldDoneMsg': 'The project was created using the scaffold.',
						'installDesc': 'Install a plugin',
						'pluginInstalled': 'Plugin installed successfully',
						'pluginUninstalled': 'Plugin uninstalled successfully',
						'uninstallDesc': 'Uninstall a plugin',
						'pluginNameDesc': 'The name of the plugin',
						'promptForTask':
							"Please specify which task you would like to execute. If you're starting a new project, please run 'init'.\n",
						'pluginKindDesc': 'Kind of plugin (NPM, Binary)',
						'pluginAlreadyInstalled': 'That plugin is already installed.',
						'pluginOptionDesc': 'Use the task from this plugin',
						'bootstrapMsg': "Project taq'ified!",
						'maxConcurrencyDesc': 'Set the maximum concurrency limit used internally',
						'providedByMany': 'Provided by more than one plugin. The option --plugin is required.',
						'pluginDesc':
							'Specify what plugin should execute this command. Use this when more than one plugin provide a task of the same name.',
						'listNetworks': 'List known networks',
						'envDesc': 'Specify an environment configuration',
						'disableStateDesc': 'Does not use the saved state.json file. State is computed for each execution.',
						'logPluginCallsDesc': 'Logs any execution calls to a plugin to the console',
						'npmInitRequired': "This project isn't a valid NPM project. Please run: npm init",
						'testFromVsCode': 'An internal command used by VS Code to test for the taq binary',
						'fromVsCode': 'An internal flag used to indicate that taq is executed via vscode',
						'buildDesc': 'Display build information about the current version',
						'pluginOption': "Use to specify what plugin you'd like when running this task.",
						'yesOptionDesc': 'Select "yes" to any prompt',
						'templateNotFound': 'Template not found. Perhaps you need to install a plugin?',
						'createDesc': 'Create files from pre-existing templates',
						'templateDesc': 'Name of the template to use',
					},
				},
			},
		}),
		__: i18next.t,
	};

	return i18n;
};

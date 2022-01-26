import i18next from 'https://deno.land/x/i18next/index.js'

// TODO: i18next is feature-rich, but rather large. Determine whether you need all of the functionality
await i18next.init({
    lng: 'en',
    debug: false,
    resources: {
        // TODO: Move to separate language files
        en: {
            translation: {
                "appName": "Taqueria",
                "appDesc": "Taqueria is an integrated environment for compiling, testing, and deploying Tezos software.",
                "betaWarning": "Taqueria is currently in BETA. You've been warned. :)",
                "configDirDesc": "Config directory (default ./.taq)",
                "initDesc": "Initialize a new project",
                "initPathDesc": "Path to your project directory",
                "scaffoldDesc": "Generate a new project using a pre-configured scaffold",
                "scaffoldUrlDesc": "Alias or Url for the scaffold project",
                "scaffoldProjectDirDesc": "Path where to create the new project. This must be a new directory.",
                "scaffoldDoneMsg": "The project was created using the scaffold.",
                "installDesc": "Install a plugin",
                "promptForTask": "Please specify which task you would like to execute. If you're starting a new project, please run 'init'.\n",
                "pluginKindDesc": "Kind of plugin (NPM, Binary)",
                "pluginAlreadyInstalled": "That plugin is already installed.",
                "pluginOptionDesc": "Use the task from this plugin",
                "bootstrapMsg": "Project taq'ified!",
                "maxConcurrencyDesc": "Set the maximum concurrency limit used internally",
                "providedByMany": "Provided by more than one plugin. The option --plugin is required.",
                "pluginDesc": "Specify what plugin should execute this command. Use this when more than one plugin provide a task of the same name.",
                "listNetworks": "List known networks",
                "envDesc": "Specify an environment configuration"
            }
        }
    }
})


export const i18n = {
    __: i18next.t
}

export default i18n
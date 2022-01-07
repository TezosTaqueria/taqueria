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
                "betaWarning": "Taqueria is current in BETA. You've been warned. :)",
                "configDirDesc": "Config directory (default ./.taq)",
                "initDesc": "Initialize a new project",
                "initPathDesc": "Path to your project directory",
                "installDesc": "Install a plugin",
                "promptForTask": "Please specify which task you would like to execute. If you're starting a new project, please run 'init'.\n",
                "pluginKindDesc": "Kind of plugin (NPM, Binary)",
                "pluginAlreadyInstalled": "That plugin is already installed.",
                "pluginOptionDesc": "Use the task from this plugin",
                "bootstrapMsg": "Project taq'ified!",
                "maxConcurrencyDesc": "Set the maximum concurrency limit used internally",
                "providedByMany": "** This task is provided by more than one plugin. Use --help for more information or distingish which plugin you would like to use for this task with --plugin **",
                "pluginDesc": "Specify what plugin should execute this command. Use this when more than one plugin provide a task of the same name.",
                "listNetworks": "List known networks"
            }
        }
    }
})


export const i18n = {
    __: i18next.t
}

export default i18n
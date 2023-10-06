const fs = require('fs');
const path = require('path');

console.log('LIGO collects anonymous usage data by default. If you prefer not to participate, you may opt out by executing the command: `taq ligo -c "analytics deny"`. For more information, please contact the LIGO team on the Tezos Discord server: https://discord.gg/tezos');

const directoryPath = path.join(process.cwd(), '.ligo');
const filePath = path.join(directoryPath, 'term_acceptance');

// Check if the .ligo directory exists
if (!fs.existsSync(directoryPath)) {
    // If not, create it
    fs.mkdirSync(directoryPath);
}

// Check if the term-acceptance file exists within .ligo
if (!fs.existsSync(filePath)) {
    // If not, create and write 'accepted' to it
    fs.writeFileSync(filePath, 'accepted');
}

// If we're provided JSON as input, parse it, and determine if the plugin name is `@taqueria/plugin-ligo-legacy`. If so, create an empty esy.json file if it doesn't exist.
const schema = process.argv.find(arg => arg.startsWith('{'))
if (schema) {
    try {
        const json = JSON.parse(schema);
        if (json.name === '@taqueria/plugin-ligo-legacy') {
            const esyJsonPath = path.join(process.cwd(), 'esy.json');
            if (!fs.existsSync(esyJsonPath)) {
                fs.writeFileSync(esyJsonPath, '{}');
            }
        }
    }
    catch {
        // Do nothing
    }   
}
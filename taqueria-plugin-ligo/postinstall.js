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

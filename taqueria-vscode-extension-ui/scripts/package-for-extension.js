import fs from 'fs/promises';
import path from 'path';

export const run = async () => {
	const sourceIndexHtmlFilePath = `./dist/index.html`;
	const sourceInteropFilePath = `./src/interop.ts`;
	const destDirPath = `../taqueria-vscode-extension/src/lib/gui/web/WebUI.ts`;

	const indexHtmlContent = await fs.readFile(sourceIndexHtmlFilePath, { encoding: `utf-8` });
	const interopContent = await fs.readFile(sourceInteropFilePath, { encoding: `utf-8` });
	const tsIndexHtml = `
// DO NOT EDIT - THIS FILE IS GENERATED 
${interopContent.replace(`{{WEB_UI_INDEX_HTML}}`, indexHtmlContent.replace(/`/g, '\\`'))}
`.trim();

	await fs.mkdir(path.dirname(destDirPath));
	await fs.writeFile(destDirPath, tsIndexHtml);
};

run().catch(err => console.error(`Unhandled error`, { err }));

import { readFile } from 'fs/promises';
import { join } from 'path';

import * as Settings from '@taqueria/protocol/Settings';

export { Settings };

export const getSettings = () =>
	readFile(join(process.env.HOME!, '.taq-settings', 'taq-settings.json'), 'utf8')
		.then(JSON.parse)
		.then(Settings.create);

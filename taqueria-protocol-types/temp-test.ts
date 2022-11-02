import * as Alias from './out/examples/Alias';
import * as PluginSchema from './out/examples/PluginSchema';
import * as VersionNumber from './out/examples/VersionNumber';

// To try in vscode:
// - Hover over the var names and fields (this should show the nominal type names)
// - Select a field and Navigate to definition (this should go directly to the types file)
// This is not to demonstrate what code should be written, it only demonstrates how the types

const pluginCreateResult = PluginSchema.create({
	name: ``,
	version: ``,
	schema: ``,
	alias: ``,
});

const pluginMakeResult = PluginSchema.make({
	__type: undefined as unknown as ReturnType<typeof PluginSchema.create>,
	name: Alias.create(``),
	version: VersionNumber.create(``),
	schema: VersionNumber.create(``),
	alias: Alias.create(``),
});

const pluginMakeResult2 = PluginSchema.make({
	...pluginCreateResult,
});

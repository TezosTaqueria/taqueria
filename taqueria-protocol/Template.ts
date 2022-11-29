import { NonEmptyString, PluginJsonResponse, RequestArgs } from '@taqueria/protocol';
import { create as createTemplate } from '@taqueria/protocol/out/types/Template';
import { Template } from '@taqueria/protocol/types';
export * from '@taqueria/protocol/out/types/Template';

type TemplateHandler =
	| NonEmptyString.t // TODO: should this be Verb?
	| ((args: RequestArgs.t) =>
		| PluginJsonResponse.t
		| Promise<PluginJsonResponse.t>)
	| Promise<void>;

type InputTemplate = Omit<Template, 'handler'> & {
	handler: TemplateHandler;
};

export function create(args: InputTemplate) {
	return createTemplate(args as Template);
}

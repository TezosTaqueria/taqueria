import { GenerateApiError } from './common';
import { TypedMethod, TypedStorage, TypedType, TypedVar } from './contract-parser';

type SchemaObjectType = { [name: string]: SchemaType };
type SchemaOptionalType = { optional: true; type: SchemaType };
type SchemaType = string | SchemaType[] | SchemaObjectType | SchemaOptionalType | null;
type SchemaMethods = {
	[name: string]: {
		params: SchemaType;
	};
};
export type SchemaOutput = {
	methods: SchemaMethods;
	storage: SchemaType;
};

export const toSchema = (methods: TypedMethod[], storage: TypedStorage): SchemaOutput => {
	const getSchemaObjectType = (vars: TypedVar[]) => {
		// console.log('getSchemaObjectType', { vars });

		if (vars.some(x => !x)) {
			throw new GenerateApiError(`getSchemaObjectType has null vars`, { vars });
		}

		return vars.reduce((out, x, i) => {
			out[x.name ?? i] = getSchemaType(x.type);
			return out;
		}, {} as SchemaObjectType);
	};

	const getSchemaType = (t: TypedType): SchemaType => {
		switch (t.kind) {
			case 'value':
				if (t.value) {
					return t.optional
						? { optional: true, type: t.value }
						: t.value;
				}
				return null;

			case 'array':
				return t.array ? [getSchemaType(t.array.item)] : null;

			case 'map':
				return t.map ? ['map', getSchemaType(t.map.key), getSchemaType(t.map.value)] : null;

			case 'object':
				return t.fields ? getSchemaObjectType(t.fields) : null;

			case 'unit':
				return 'unit';

			case 'never':
				return 'never';

			case 'lambda':
				return ['lambda', getSchemaType(t.lambda.arg), getSchemaType(t.lambda.ret)];

			default:
				return `${t.raw as unknown as string}`;
		}
	};

	const schemaMethods = methods.reduce((out, x) => {
		// console.log('schemaMethods', { x });

		out[x.name] = {
			params: x.args.length === 1 && !x.args[0].name
				? getSchemaType(x.args[0].type)
				: getSchemaObjectType(x.args ?? []),
		};
		return out;
	}, {} as SchemaMethods);

	const schemaStorage = getSchemaType(storage.storage);

	return {
		methods: schemaMethods,
		storage: schemaStorage,
	};
};

interface MockedObject {
	readonly __mocked: true;
}

export const make = <T extends Record<string, unknown>>(
	obj: T,
	methodMap: Record<string, Function>,
	currentPath?: string[],
): T => {
	if (obj.__mocked) return obj;

	const proxy = new Proxy(obj, {
		get(target, prop, _receiver) {
			const execPath = (currentPath
				? [...currentPath, prop.toString()]
				: [prop.toString()]).join('.');

			if (methodMap[execPath]) return methodMap[execPath].bind(target);

			if (typeof target[prop.toString()] === 'object') {
				const nextTarget = target[prop.toString()] as Record<string, unknown>;
				const nextPath = currentPath ? [...currentPath, prop.toString()] : [prop.toString()];
				return make(nextTarget, methodMap, nextPath);
			}
			return target[prop.toString()];
		},
	});

	return proxy as T;
};

export default make;

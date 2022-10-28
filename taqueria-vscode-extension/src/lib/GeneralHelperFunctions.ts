export const isNullish = (item: unknown) => {
	return item === undefined || item === null;
};

export const notNullish = (item: unknown) => {
	return !isNullish(item);
};

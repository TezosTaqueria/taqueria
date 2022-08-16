/*******************************************************************************
 * Fn Type
 *
 * Represents a function with arbitrary arity of arguments
 ******************************************************************************/
export type Fn<AS extends unknown[], B> = (...as: AS) => B;

/*******************************************************************************
 * UnknownFn Type
 *
 * Represents a function with unknown unputs and output
 ******************************************************************************/
export type UnknownFn = Fn<unknown[], unknown>;

/**
 * Apply1
 *
 * A special case of apply for functions that only take a single argument
 */
export const apply1 = <A, B>(a: A, fn: Fn<[A], B>): B => fn(a);

/**
 * Pipe
 *
 * The pipe takes a value as the first argument and composes it with subsequent
 * function arguments, returning the result of the last function passed in
 *
 * Original pipe function pulled from fp-ts and modified
 * https://github.com/gcanti/fp-ts/blob/master/src/pipeable.ts
 */
export type PipeFn = {
	<A>(a: A): A;
	<A, B>(a: A, ab: (a: A) => B): B;
	<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
	<A, B, C, D>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
	): D;
	<A, B, C, D, E>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
	): E;
	<A, B, C, D, E, F>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
		ef: (e: E) => F,
	): F;
	<A, B, C, D, E, F, G>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
		ef: (e: E) => F,
		fg: (f: F) => G,
	): G;
	<A, B, C, D, E, F, G, H>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
		ef: (e: E) => F,
		fg: (f: F) => G,
		gh: (g: G) => H,
	): H;
	<A, B, C, D, E, F, G, H, I>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
		ef: (e: E) => F,
		fg: (f: F) => G,
		gh: (g: G) => H,
		hi: (h: H) => I,
	): I;
	<A, B, C, D, E, F, G, H, I, J>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
		ef: (e: E) => F,
		fg: (f: F) => G,
		gh: (g: G) => H,
		hi: (h: H) => I,
		ij: (i: I) => J,
	): J;
	<A, B, C, D, E, F, G, H, I, J, K>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
		ef: (e: E) => F,
		fg: (f: F) => G,
		gh: (g: G) => H,
		hi: (h: H) => I,
		ij: (i: I) => J,
		jk: (j: J) => K,
	): K;
	<A, B, C, D, E, F, G, H, I, J, K, L>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
		ef: (e: E) => F,
		fg: (f: F) => G,
		gh: (g: G) => H,
		hi: (h: H) => I,
		ij: (i: I) => J,
		jk: (j: J) => K,
		kl: (K: K) => L,
	): L;
	<A, B, C, D, E, F, G, H, I, J, K, L>(
		a: A,
		ab: (a: A) => B,
		bc: (b: B) => C,
		cd: (c: C) => D,
		de: (d: D) => E,
		ef: (e: E) => F,
		fg: (f: F) => G,
		gh: (g: G) => H,
		hi: (h: H) => I,
		ij: (i: I) => J,
		jk: (j: J) => K,
		kl: (K: K) => L,
		end: never,
	): L;
};

export const pipe: PipeFn = (a: unknown, ...fns: UnknownFn[]): unknown => fns.reduce(apply1, a);

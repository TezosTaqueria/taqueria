import { Pool } from 'pg';

export class DbConnectionPools {
	private static pools: Map<string, Pool> = new Map();

	getPool(connectionString: string): Pool {
		let pool = DbConnectionPools.pools.get(connectionString);
		if (pool) {
			return pool;
		}
		pool = new Pool({
			connectionString,
		});
		DbConnectionPools.pools.set(connectionString, pool);
		return pool;
	}
}

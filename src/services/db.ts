import {
  CapacitorSQLite,
  capSQLiteChanges,
  capSQLiteSet,
  SQLiteConnection,
  type SQLiteDBConnection,
} from '@capacitor-community/sqlite';

// @TODO Move constants into the env variables.
const DATABASE_NAME = 'kwrapper';

const SCHEMA_QUERIES = `
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY NOT NULL,
    payer TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    price_limit INTEGER,
    response_count INTEGER NOT NULL,
    activated_at INTEGER NOT NULL,
    expire_at INTEGER NOT_NULL,
    files TEXT NOT NULL
  );
`;

const connection = new SQLiteConnection(CapacitorSQLite);

let db: SQLiteDBConnection | null = null;

export async function connect(): Promise<SQLiteDBConnection> {
  if (db) {
    return db;
  }

  const consistency =
    await connection.checkConnectionsConsistency();

  const exists =
    (await connection.isConnection(DATABASE_NAME, false)).result;

  if (consistency.result && exists) {
    db = await connection.retrieveConnection(
      DATABASE_NAME,
      false
    );
  } else {
    db = await connection.createConnection(
      DATABASE_NAME, 
      false, // encrypted
      'no-encryption', 
      1,  // version
      false // read only
    );
  }

  await db.open();

  await db.execute(SCHEMA_QUERIES);

  return db;
}

export async function query<T = any>(
  sql: string,
  values: unknown[] = []
): Promise<T[]> {
  const db = await connect();

  const result = await db.query(sql, values);

  return (result.values ?? []) as T[];
}

export async function run(
  sql: string,
  values: unknown[] = []
): Promise<capSQLiteChanges> {
  const db = await connect();

  return await db.run(sql, values);
}

export async function execute(
  statements: capSQLiteSet[],
):Promise<capSQLiteChanges> {
  const db = await connect();

  return await db.executeSet(statements);
}

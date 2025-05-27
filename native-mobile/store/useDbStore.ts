import { DATABASE_SETTINGS } from "@/constants/AppConstants";
import * as SQLite from "expo-sqlite";

/**
 * DOCU: Use to open and get connection from the sqlite database
 * Triggered: After 
 * @returns {SQLite.SQLiteDatabase}  database - connection instance to be used 
 * Last Updated Date: August 23, 2024
 * @author NoahJerreel
 */
export const getDatabaseConnection = async () => {
    const database = await SQLite.openDatabaseAsync(DATABASE_SETTINGS.name, {
        useNewConnection: true
    });

    await database.execAsync('PRAGMA journal_mode = WAL');
    await database.execAsync('PRAGMA foreign_keys = ON');

    return database;
};

/**
 * DOCU: Use to close connection from the sqlite database
 * Triggered: After 
 * @param {SQLite.SQLiteDatabase}  sqliteDatabase - connection instance to be closed
 * Last Updated Date: August 23, 2024
 * @author NoahJerreel
 */
export const dropDatabaseConnection = async (sqliteDatabase:SQLite.SQLiteDatabase) => {
    await sqliteDatabase.closeAsync();
}  

/**
 * DOCU: Use to create initial tables of the sqlite database
 * Triggered: On Screen Load
 * @param {SQLite.SQLiteDatabase}  sqliteDatabase - connection instance to be closed
 * Last Updated Date: September 11, 2024
 * @author NoahJerreel
 */
export const initializeTables = async ():Promise<void> => {
    const sqliteDatabase = await getDatabaseConnection();

    try {
        const current_db = await sqliteDatabase.getFirstAsync<{ user_version: number | null }>(
            'PRAGMA user_version'
        );

        /* Check if sqlite version was not yet setup or doesn't match the updated database version */
        if (current_db?.user_version && current_db?.user_version >= ((process.env.DATABASE_VERSION as unknown) as number)) {
            return;
        }

        /* Initially create tables if database version is not yet set-up */
        if (!current_db?.user_version) {
            /* Start a transaction connection */
            await sqliteDatabase.withExclusiveTransactionAsync(async (transaction) => {
                /* Create user_secured_keys table */
                await transaction.execAsync(`
                    CREATE TABLE IF NOT EXISTS user_secured_keys (
                        id INTEGER PRIMARY KEY,
                        user_device_id INTEGER NOT NULL,
                        public_key	TEXT,
                        created_at TEXT,
                        updated_at TEXT
                    );
                `);

                /* Create user_cached_data table */
                await transaction.execAsync(`
                    CREATE TABLE IF NOT EXISTS user_cached_data (
                        data_key varchar(50),
                        data_value	TEXT,
                        created_at TEXT,
                        updated_at TEXT
                    );
                `);

                /* Update the user_version */
                await transaction.execAsync(`PRAGMA user_version = ${process.env.DATABASE_VERSION}`);
            });
        }
    }
    catch (error){
        /* Handle error when initializing tables */
        console.error("error", error);
    }

    await dropDatabaseConnection(sqliteDatabase);
};

/**
 * DOCU: Use to store cache data
 * Triggered: When caching information is needed on a certain screen
 * @param {string}  key - cache name
 * @param {string}  value - cache data to be stored
 * @returns {Promise<Boolean>} returns true or false if cache is properly stored in the database
 * Last Updated Date: September 11, 2024
 * @author NoahJerreel
 */
export const createCacheData = async (key:string, value:string) : Promise<boolean> => {
    const sqliteDatabase = await getDatabaseConnection();

    try {
        await sqliteDatabase.execAsync(`
            INSERT INTO user_cached_data (data_key, data_value, created_at, updated_at)
            VALUES ('${key}', '${value}', '${new Date()}', '${new Date()}')     
        `);
    
        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

/**
 * DOCU: Use to update cache data
 * Triggered: When caching information is needed on a certain screen
 * @param {string}  key - cache name
 * @param {string}  value - cache data to be stored
 * @returns {Promise<Boolean>} returns true or false if cache is properly stored in the database
 * Last Updated Date: September 11, 2024
 * @author NoahJerreel
 */
export const updateCacheData = async (key:string, updated_value:string) : Promise<boolean> => {
    const sqliteDatabase = await getDatabaseConnection();

    try {
        await sqliteDatabase.execAsync(`
            UPDATE user_cached_data 
            SET data_value = '${updated_value}'
            WHERE data_key = '${key}'     
        `);
    
        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

/**
 * DOCU: Use to fetch cache data
 * Triggered: When caching information is needed on a certain screen
 * @param {string}  key - cache name of the data to be fetched
 * @returns {Promise<ResponseDataType | null>} returns the cache data or null from the database
 * Last Updated Date: September 10, 2024
 * @author NoahJerreel
 */
export const getCacheData = async <ResponseDataType> (key:string) : Promise<ResponseDataType | null> => {
    const sqliteDatabase = await getDatabaseConnection();
    
    return await sqliteDatabase.getFirstAsync(`
        SELECT data_value FROM user_cached_data
        WHERE data_key = '${key}'
    `);
}

export const removeCacheData = async (key:string) : Promise<void> => {
    const sqliteDatabase = await getDatabaseConnection();
    
    await sqliteDatabase.getFirstAsync(`
        DELETE FROM user_cached_data
        WHERE data_key = '${key}'
    `);

    await dropDatabaseConnection(sqliteDatabase);
}


/**
 * DOCU: Use to reset cache data
 * Triggered: When clearing cache data
 * Last Updated Date: September 11, 2024
 * @author NoahJerreel
 */
export const clearCacheData = async () : Promise<void> => {
    const sqliteDatabase = await getDatabaseConnection();

    try {
        await sqliteDatabase.runAsync(`DELETE FROM user_cached_data;`);
    }
    catch(error){
        console.log(error);
    }

    await dropDatabaseConnection(sqliteDatabase);
}


/**
 * DOCU: Use to drop the initial tables from the sqlite database
 * Last Updated Date: September 11, 2024
 * @author NoahJerreel
 */
export const dropInitialTables = async () => {
    try{
        const sqliteDatabase = await getDatabaseConnection();
        
        /* Start a transaction connection */
        await sqliteDatabase.withExclusiveTransactionAsync(async (transaction) => {
            /* Remove decrypted_messages table */
            await transaction.execAsync(`
                DROP TABLE IF EXISTS decrypted_messages;
            `);

            /* Remove user_secured_keys table */
            await transaction.execAsync(` 
                DROP TABLE IF EXISTS user_secured_keys;
            `);
        });

    }
    catch(error){
        /* TODO: remove console.log and handle error when dropping tables */
        console.log(error);
    }
};

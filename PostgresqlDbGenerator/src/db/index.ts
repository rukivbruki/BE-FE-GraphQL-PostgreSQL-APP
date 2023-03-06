const {Client} = require('pg');
import {config} from "../config";

const dbConfig = config.db;

const connectToDb = async () => {
    const client = new Client(dbConfig);

    await client.connect();
    console.log('Connected to database');
    return client;
};

export {connectToDb}

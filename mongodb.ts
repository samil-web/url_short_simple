import {Db,MongoClient,MongoClientOptions} from 'mongodb';
// import {formatlogs} from './utils';

// Create a cached connection to the database
let cached : Db | null = null;

export default async function connectToDatabase() : Promise<Db> {
    // Check the cached connection
    if (cached) {
        return cached;
    }
    const opts: MongoClientOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as MongoClientOptions;
    
    // If no cached, create a new connection
    const client = new MongoClient(process.env.ATLAS_URI_PROD as string,opts);
    await client.connect();
    const db: Db = client.db(process.env.DB_NAME);
    cached = db;
    return db;
}
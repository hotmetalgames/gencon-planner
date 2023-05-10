import { MongoClient } from 'mongodb';
const DB_URI =
	'mongodb+srv://readonly:readonly@gencon.vo0rxmy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(DB_URI);
await client.connect();
export default client.db('GenCon2023');

const WRITER_DB_URI =
	'mongodb+srv://writer:writer@gencon.vo0rxmy.mongodb.net/?retryWrites=true&w=majority';
const writerClient = new MongoClient(WRITER_DB_URI);
await writerClient.connect();
export const writer = writerClient.db('GenCon2023');

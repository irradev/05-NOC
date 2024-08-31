import mongoose from "mongoose";
import { MongoDatabase } from "./init"

describe('mongoDB: init.ts', () => {

    const {MONGO_URL, MONGO_DB_NAME} = process.env;

    afterAll(async () => {
        mongoose.connection.close();
    });

    test('should connect to MongoDB', async () => {

        const isConnected = await MongoDatabase.connect({
            mongoUrl: MONGO_URL!,
            dbName: MONGO_DB_NAME!,
        });

        expect(isConnected).toBe(true);
    });

    test('should throw an error', async () => {

        try {
            await MongoDatabase.connect({
                mongoUrl: 'mongodb://irsdfasdfra:asdfasdf@localhost:27317',
                dbName: MONGO_DB_NAME!,
            });
            
        } catch (error) {
           expect(`${error}`).toContain('MongooseError');
        }

    });
});
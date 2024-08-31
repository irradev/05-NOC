import mongoose from "mongoose";


interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: ConnectionOptions) {
        try {
            
            await mongoose.connect(options.mongoUrl, {
                dbName: options.dbName
            });

            return true;

        } catch (error) {
            throw error;
        }
    }
}
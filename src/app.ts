import { ServerApp } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from "./data/mongo/init";
import { LogModel } from "./data/mongo/models/log.model";
import { PrismaClient } from "@prisma/client";

(async() => {
    main();
})();

async function main () {
    
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'MEDIUM',
    //         message: 'Test message medium',
    //         origin: 'App.ts'
    //     }
    // });

    // console.log(newLog);
    // const prismLogs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // });
    // console.log(prismLogs);


    // const logs = await LogModel.find({
    //     level: 'MEDIUM'});
    // console.log(logs);

    ServerApp.start();
}
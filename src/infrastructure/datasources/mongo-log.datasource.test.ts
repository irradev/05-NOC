import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDatabase } from "../../data/mongo/init";
import { MongoLogDataSource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo/models/log.model";

describe('mongo-log.datasource.ts', () => {
    
    const logDatasource = new MongoLogDataSource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts'
    });

    const logSpy = jest.spyOn(console, 'log').mockReturnValue();
    
    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        });
    });

    afterEach(async () => {
        await LogModel.deleteMany();
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await mongoose.connection.close();
        logSpy.mockRestore();
    });
    
    test('should create a log', async() => {

        await logDatasource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.not.stringContaining('hola'));
        
    });

    test('should get logs', async() => {

        await logDatasource.saveLog(log);
        await logDatasource.saveLog(log);

        const logs = await logDatasource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });

    
});
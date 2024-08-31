import { LogModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDataSource  implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {

        try {
            const newLog = await LogModel.create(log);
            console.log('Mongo Log created:', newLog._id.toString());
        } catch (error) {
            console.log('Mongo saveLog error:', error);
            throw error;
        }
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        try {
            const logs = await LogModel.find({ level: severityLevel });
            return logs.map( LogEntity.fromObject );
            // return logs.map(mongoLog => LogEntity.fromObject(mongoLog)); // es lo mismo

        } catch (error) {
            console.log('Mongo getLog error:', error);
            throw error;
        }
    }

}
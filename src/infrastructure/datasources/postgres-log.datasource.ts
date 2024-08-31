import { PrismaClient, type LogModel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class PostgresLogDataSource implements LogDatasource {

    private prisma = new PrismaClient();

    async saveLog(log: LogEntity): Promise<void> {

        try {
            await this.prisma.logModel.create({
                data: {
                    ...log,
                    level: log.level.toUpperCase() as LogModel['level']
                }
            })
        } catch (error) {
            console.log('Database saveLog error:', error);
            throw error;
        }
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        try {
            const logs = await this.prisma.logModel.findMany({
                where: {
                    level: severityLevel.toUpperCase() as LogModel['level']
                }
            });

            return logs.map(log => LogEntity.fromObject(log));
        } catch (error) {
            console.log('Database getLog error:', error);
            throw error;
        }
    }
    
}
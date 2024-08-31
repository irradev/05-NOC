import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import fs from 'fs'



export class FileSystemDatasource implements LogDatasource {
    private readonly logsPath = 'logs/';
    private readonly lowLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';
    
    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles() {
        if (!fs.existsSync(this.logsPath)) {
            fs.mkdirSync(this.logsPath);
        }
        
        [
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        })
    }

    private getLogPath(logLevel: LogSeverityLevel) {
        switch (logLevel) {
            case LogSeverityLevel.low:
                return this.lowLogsPath;
            case LogSeverityLevel.medium:
                return this.mediumLogsPath;
            case LogSeverityLevel.high:
                return this.highLogsPath;
            default:
                throw new Error('Severity level not implementd');
        }
    }

    private getLogsFromFile (path: string): LogEntity[] {
        const logsAsJson = fs.readFileSync(path, 'utf-8');
        if (logsAsJson === '') return [];
        const logs = logsAsJson.split('\n').filter(log => log !== '');
        return logs.map(log => LogEntity.fromJson(log));
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`;
        const path = this.getLogPath(newLog.level);

        fs.appendFileSync(path, logAsJson);   
        
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const path = this.getLogPath(severityLevel);
        const logEntities = this.getLogsFromFile(path);
        
        return logEntities;
    }
    
}
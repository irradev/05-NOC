import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('file-system.datasource.ts', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, {recursive: true, force: true});
    });

    test('should create log files if the do not exists', () => {
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        expect(files.length).toBe(3);
        expect(files).toContain('logs-low.log');
        expect(files).toContain('logs-medium.log');
        expect(files).toContain('logs-high.log');
    });

    test('should save a log in logs-low file', async () => {
        const logDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.low
        });
        logDatasource.saveLog(newLog);
        const lowLogs = fs.readFileSync(path.join(logPath, 'logs-low.log'), 'utf-8');
        expect(lowLogs).toContain('test-message');
    });
    
    test('should save a log in logs-medium file', async () => {
        const logDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.medium
        });

        logDatasource.saveLog(newLog);
        const mediumLogs = fs.readFileSync(path.join(logPath, 'logs-medium.log'), 'utf-8');
        expect(mediumLogs).toContain('test-message');
    });

    test('should save a log in logs-high file', async () => {
        const logDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.high
        });
        logDatasource.saveLog(newLog);
        const highLogs = fs.readFileSync(path.join(logPath, 'logs-high.log'), 'utf-8');
        expect(highLogs).toContain('test-message');
    });

    test('should return all low logs', async () => {
        const logDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.low
        });
        logDatasource.saveLog(newLog);
        const logs = await logDatasource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });

    test('should throw an error if logSeverityLevel is not implemented', async () => {
        const logDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.low
        });
        logDatasource.saveLog(newLog);
        await expect(logDatasource.getLogs('not-level' as LogSeverityLevel)).rejects.toThrow();
    });

    test('should return an empty array if there are no logs', async () => {
        const logDatasource = new FileSystemDatasource();
        const logs = await logDatasource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(0);
    });

    
});
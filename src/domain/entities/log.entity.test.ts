import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('log.entity.ts', () => {
   
    const dataObj = {
        origin: 'log.entity.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    };

    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from JSON', () => {

        const json = `{
            "origin" : "log.entity.test.ts",
            "message" : "test-message",
            "level" : "low",
            "createdAt" : 1724904311442
        }`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(log.message);
        expect(log.level).toBe(log.level);
        expect(log.origin).toBe(log.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});
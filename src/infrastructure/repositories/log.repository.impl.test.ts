import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('log.repository.impl.ts', () => {

    const log = {} as LogEntity;

    const mockDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn().mockReturnValue([log] as LogEntity[]),
    };

    afterAll(() => {
        jest.clearAllMocks();
    });

    const logRepository = new LogRepositoryImpl(mockDatasource);

    test('saveLog should be call the datasource', () => {
        logRepository.saveLog(log);
        expect(mockDatasource.saveLog).toHaveBeenCalledWith(log);
    });

    test('getLogs should be call the datasource', async () => {
        const logs = await logRepository.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
    });
});
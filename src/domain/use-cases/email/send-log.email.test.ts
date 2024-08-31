import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendLogEmail } from "./send-log-email";


describe('send-log.email.ts', () => {
   
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    } as unknown as EmailService;

    const mockLogRepsitory: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };    

    const sendEmailLogs = new SendLogEmail(
        mockEmailService,
        mockLogRepsitory,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLog', async () => {

        const result = await sendEmailLogs.execute('test@test.com');
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepsitory.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepsitory.saveLog).toHaveBeenCalledWith({
            level: LogSeverityLevel.low,
            message: `Log email sent`,
            origin: 'send-log-email.ts',
            createdAt: expect.any(Date),
        });
        
    });
    
    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs = jest.fn().mockReturnValue(false);

        const result = await sendEmailLogs.execute('test@test.com');
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepsitory.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepsitory.saveLog).toHaveBeenCalledWith({
            level: LogSeverityLevel.high,
            message: `Email log not sent`,
            origin: 'send-log-email.ts',
            createdAt: expect.any(Date),
        });

    });
});
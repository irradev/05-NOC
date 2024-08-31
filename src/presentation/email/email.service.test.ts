import { EmailService, type SendEmailOptions } from "./email.service";
import nodemailer from 'nodemailer';

describe('email.service.ts', () => {

    const mockSendEmail = jest.fn();

    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail
    });

    const emailService = new EmailService();

    test('should send email', async () => {

        const options: SendEmailOptions = {
            from: 'from_test@test',
            to: 'to_test@test',
            subject: 'Subject test',
            htmlBody: 'Html body test',
        };

        await emailService.sendEmail(options);
        expect(mockSendEmail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "from": "from_test@test",
            "html": "Html body test",
            "subject": "Subject test",
            "to": "to_test@test"
        });
    });

    test('send email with attachments', async () => {
        
        await emailService.sendEmailWithFileSystemLogs('email@test.test');
        expect(mockSendEmail).toHaveBeenCalledWith({
            from: 'LOG SYSTEM 2.0 - noc-system@noreply.com',
            to: 'email@test.test',
            subject: 'Logs de sistema - NOC',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: "logs-low.log", path: "./logs/logs-low.log" },
                { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
                { filename: "logs-high.log", path: "./logs/logs-high.log" },
            ])

        });

    });

});
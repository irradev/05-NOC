import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface SendEmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(
    ) {}

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        
        try {
            await this.transporter.sendMail({
                from: options.from,
                to: options.to,
                subject: options.subject,
                html: options.htmlBody,
                attachments: options.attachments || [],
            });

            return true;   
        } catch (error) {
            console.error(error);

            return false;
        }

        
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs de sistema - NOC';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>
                Se han generado logs que son necesarios para su revisión.
            </p>
            <p>
                Favor de revisarlos.
            </p>
            <a>Ver logs</a>
            <p>Saludos cordiales</p>
        `;
        const attachments: Attachment[] = [
            {
                filename: 'logs-low.log',
                path: './logs/logs-low.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            }
        ];

        return await this.sendEmail({
            from: 'LOG SYSTEM 2.0 - noc-system@noreply.com',
            to,
            subject,
            htmlBody,
            attachments
        })
    }
}
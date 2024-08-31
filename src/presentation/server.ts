import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendLogEmail } from "../domain/use-cases/email/send-log-email";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron.service";
import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    // new MongoLogDataSource()
    new PostgresLogDataSource()
);
const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDataSource());

const dataSourceRepositories = [
    fsLogRepository,
    mongoLogRepository,
    postgresLogRepository
]

const emailService = new EmailService();

export class ServerApp {
    public static start() {
        console.log('Server started');
        const url = 'http://localhost:3000/';

        // new SendLogEmail(
        //     emailService,
        //     logRepository,
        // ).execute(['israeldevcorel@gmail.com']);




        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.error(error)
        //         ).execute(url);
        //     }
        // );
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckServiceMultiple(
                    dataSourceRepositories,
                    () => console.log(`${url} is ok`),
                    (error) => console.error(error)
                ).execute(url);
            }
        );
    }
}
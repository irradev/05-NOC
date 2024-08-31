import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined; 

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {

    }

    private callLogs(Log: LogEntity) {
        this.logRepository.map(repository => repository.saveLog(Log));
    }

    private createLog(message: string, level: LogSeverityLevel): LogEntity {
        const log = new LogEntity({
            message,
            level,
            origin: 'check-service.ts'
        });

        return log;
    }

    async execute(url: string): Promise<boolean> {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error on check srvice: ${url}`);
            }
            const log = this.createLog(`${url} is ok`, LogSeverityLevel.low);
            this.callLogs(log);

            if (this.successCallback) {
                this.successCallback();
            }
            
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            const log = this.createLog(errorMessage , LogSeverityLevel.high);
            this.callLogs(log);

            if (this.errorCallback) {
                this.errorCallback(errorMessage);
            }
            
            return false;
        }
    }
}
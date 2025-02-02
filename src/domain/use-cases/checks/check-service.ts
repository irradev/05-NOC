import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined; 

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

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
            this.logRepository.saveLog(log);

            if (this.successCallback) {
                this.successCallback();
            }
            
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            const log = this.createLog(errorMessage , LogSeverityLevel.high);
            this.logRepository.saveLog(log);

            if (this.errorCallback) {
                this.errorCallback(errorMessage);
            }
            
            return false;
        }
    }
}
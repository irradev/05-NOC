
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        this.message = options.message;
        this.level = options.level;
        this.createdAt = options.createdAt || new Date();
        this.origin = options.origin;
    }

    static parseAndValidateJson = (json: string): LogEntityOptions => {
        json = (json === '' ? '{}' : json);
        const jsonParsed = JSON.parse(json);
        const { message, level, createdAt, origin } = jsonParsed;
        let createdAtDate: Date;
        
        if (!message) {
            throw new Error('Message is not present in the log');
        }
        if (!level) {
            throw new Error('Level is not present in the log');
        }
        if (!createdAt) {
            throw new Error('CreatedAt is not present in the log');
        } else {
            createdAtDate = new Date(createdAt);
        }
        if (!origin) {
            throw new Error('Origin is not present in the log');
        }

        return {
            ...jsonParsed,
            createdAt: createdAtDate,
        };
    }

    static fromJson = (json: string): LogEntity => {
        const validatedJsonObject = this.parseAndValidateJson(json);
        return new LogEntity(validatedJsonObject);
    }

    static fromObject = (object: {[key: string]: any}): LogEntity => {
       
        const validatedJsonObject = this.parseAndValidateJson(JSON.stringify({
            message: object.message,
            level: object.level,
            origin: object.origin,
            createdAt: object.createdAt || new Date(),
        }));
        return new LogEntity(validatedJsonObject);
    }
}

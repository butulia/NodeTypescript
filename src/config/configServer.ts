import * as dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class ConfigServer {
    constructor() {
        const nodeEnvironmentFile = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeEnvironmentFile,
        });
    }

    public get nodeEnv(): string {
        return this.getEnvironment("NODE_ENV")?.trim() || "";
    }
    public get port(): number {
        return this.getFromEnvironment<number>("PORT");
    }
    public get typeORMConfig(): ConnectionOptions {
        return {
            type: "mysql",
            host: this.getEnvironment("DB_HOST"),
            port: this.getNumberFromEnvironment("DB_PORT"),
            username: this.getEnvironment("DB_USER"),
            password: this.getEnvironment("DB_PASSWORD"),
            database: this.getEnvironment("DB_DATABASE"),
            entities: [__dirname + "../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "../../migrations/*{.ts,.js}"],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy()
        };
    }

    public getEnvironment(key: string): string | undefined {
        return process.env[key];
    }
    public getFromEnvironment<Type>(key: string): Type {
        return this.getEnvironment(key) as any;
    }

    public getNumberFromEnvironment(key: string): number {
        return Number(this.getEnvironment(key));
    }

    public createPathEnv(path: string): string {
        let arrayEnv: Array<string> = ["env"];

        if (path.length > 0) {
            const stringToArray = path.split(".");
            arrayEnv = arrayEnv.concat(stringToArray);
        }

        return "." + arrayEnv.join(".");
    }
}

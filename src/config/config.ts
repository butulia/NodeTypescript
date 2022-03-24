import * as dotenv from "dotenv";

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
    public get port():number{
        return this.getFromEnvironment<number>("PORT");
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

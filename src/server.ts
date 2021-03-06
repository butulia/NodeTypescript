import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./router/user.router";
import { ConfigServer } from "./config/configServer";
import { Connection, createConnection } from "typeorm";

class ServerStartup extends ConfigServer {
    public app: express.Application = express();
  
    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.dbConnect();
        this.app.use(morgan("dev"));
        this.app.use(cors());

        this.app.use("/api", this.routers());
        this.listen();
    }

    routers(): Array<express.Router> {
        return [new UserRouter().router];
    }

    async dbConnect():Promise<Connection> {
        return await createConnection(this.typeORMConfig);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening at port => " + this.port);
        });
    }
}

new ServerStartup();

import express from "express";
import morgan from "morgan";
import cors from "cors";

class ServerStartup {
    public app: express.Application = express();
    private port: number = 3000;

    /**
     *  Inicia el servidor
     */
    constructor() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan("dev"));
        this.app.use(cors());

        this.app.get("/api/hola", (req, res)=>{
            res.status(200).json({
                message: "Hola mundo"
            });
        });
        this.listen();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening at port => " + this.port);
        });
    }
}

new ServerStartup();
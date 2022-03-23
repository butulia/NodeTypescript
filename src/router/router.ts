import { Router } from "express";

export class BaseRouter<TC> {
    public router: Router;
    public controller: TC;
    //public middleware: TM
    constructor(TController: { new (): TC }) {
        this.router = Router();
        this.controller = new TController();
        this.routes();
    }

    routes(){}
}

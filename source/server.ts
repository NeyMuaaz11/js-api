import http from 'http';
import express, { Express } from 'express';
import router from "./router/routes"

export default class APIServer {

    app: Express;

    constructor(app: Express) {
        this.app = app
    }

    setup(): Express {
        this.app.use(express.json())
        this.app.use('/', router)
        return this.app
    }

    start(): void {
        const app = this.setup()
        const server = http.createServer(app)
        const PORT = 8080
        server.listen(PORT, () => {
            console.log(`API is live on http://localhost:${PORT}`)
        })
    }

}

import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
const routes = require("./router/routes")


export function setup(): Express {
    const app = express()
    app.use(morgan('dev'))
    app.use(express.json())
    app.use('/', routes.router)
    return app
}

export function start(): void {
    var app = exports.setup()
    const server = http.createServer(app)
    const PORT = 8080
    server.listen(PORT, () =>{
        console.log(`API is live on http://localhost:${PORT}`)
    })
}


// start()

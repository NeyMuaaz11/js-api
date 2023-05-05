import APIServer from "./server.ts";
import express from "express"

const app = express()
const server = new APIServer(app)
server.start()

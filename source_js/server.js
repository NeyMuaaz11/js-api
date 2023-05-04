import http from 'http';
import express from 'express';
import morgan from 'morgan';
import routes from './router/routes.js';
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/', routes);
const server = http.createServer(app);
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`API is live on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
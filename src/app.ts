import express, { Request, Response, NextFunction } from 'express';
import helmet from "helmet";
import cors from 'cors';
import morgan from 'morgan'
import authRouter from './router/auth';
import nftRouter from './router/nft';
import { config } from "./config";
import { sequelize } from "./db/database";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/nft', nftRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(500);
    console.log(error);
});

sequelize.sync().then(() => {
    console.log(config.host.port)
    app.listen(config.host.port);
});

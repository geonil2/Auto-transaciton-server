import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import { config } from '../config';

export const token = async (req: Request, res: Response) => {
    const address = req.get('X-Authorization-Wallet') as string;
    const token = createJwtToken(address);
    res.status(201).json({ address, token : token });
}

function createJwtToken(address: string) {
    return jwt.sign({ address }, config.jwt.secretKey as string, { expiresIn : config.jwt.expiresInSec});
}

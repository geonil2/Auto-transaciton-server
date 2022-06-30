import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import 'express-async-errors';
import {caver} from "../connection/caver";

const AUTH_ERROR = { message : 'Authorization Error' };

export const isAuthSignature = async (req: Request, res: Response, next: NextFunction) => {
  const authHeaderWallet = req.get('X-Authorization-Wallet') as string;
  const authHeaderMessage = req.get('X-Authorization-Message') as string;
  const authHeaderSignature = req.get('X-Authorization-Signature') as string;
  const v = '0x' + authHeaderSignature.substring(2).substring(128, 130);
  const r = '0x' + authHeaderSignature.substring(2).substring(0, 64);
  const s = '0x' + authHeaderSignature.substring(2).substring(64, 128);
  const validate = await caver.validator.validateSignedMessage(authHeaderMessage, [v, r, s], authHeaderWallet);
  return validate ? next() : res.status(401).json(AUTH_ERROR);
}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(' ' )[1];
    jwt.verify(
        token,
        config.jwt.secretKey as string,
        async (error, decoded: any) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            next();
        }
    );
}

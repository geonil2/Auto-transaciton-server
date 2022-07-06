import express from 'express';
import 'express-async-errors';
import { body } from "express-validator";
import * as nftController from '../controller/nft';
import {isAuth} from "../middleware/auth";

const router = express.Router();

const validateUpdate = [
    body('url').trim().notEmpty().withMessage('url is missing')
];

router.get('/metadata', validateUpdate, nftController.getMetadata);
router.post('/metadata', validateUpdate, nftController.createMetadata);
router.delete('/metadata', isAuth, nftController.deleteMetadata);

export default router;

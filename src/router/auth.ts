import express from 'express';
import 'express-async-errors';
import { validate } from "../middleware/validator";
import * as authController from '../controller/auth';
import {isAuthSignature} from "../middleware/auth";

const router = express.Router();

router.get('/token', isAuthSignature, validate, authController.token);

export default router;

import * as express from 'express';

const router = express.Router();

import KycController from '../../../app/controllers/kyc.controller';

import { verifyToken } from '../../../app/middlewares/auth.middleware';

router.get('/accessToken', KycController.accessToken);

export default router;

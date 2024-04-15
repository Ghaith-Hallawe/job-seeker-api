import * as express from 'express';

const router = express.Router();

import ResourcesController from '../../../app/controllers/resources.controller';

import { verifyToken } from '../../../app/middlewares/auth.middleware';

router.get('/', verifyToken, ResourcesController.getJobPostResources);
router.get('/countries', verifyToken, ResourcesController.getCountries);

export default router;

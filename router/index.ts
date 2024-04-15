

import * as express from 'express';
import APIRouter from './api/v1';

const router = express.Router(); 

router.use('/api/v1', APIRouter);


export default router;

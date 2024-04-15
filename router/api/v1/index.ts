import * as express from 'express';
import AuthRouter from './auth';
import KycRouter from './kyc';
import HealthRouter from './health';
import ResourcesRouter from './resources';
import JobPostRouter from './jobPost';
import JobApplicationRouter from './jobapplication';

const router = express.Router();

router.use('/auth', AuthRouter);

router.use('/kyc', KycRouter);

router.use('/health', HealthRouter);

router.use('/resources', ResourcesRouter);

router.use('/job-posts', JobPostRouter);

router.use('/job-application', JobApplicationRouter);

export default router;

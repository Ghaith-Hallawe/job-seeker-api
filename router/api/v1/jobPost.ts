import * as express from 'express';

const router = express.Router();

import JobController from '../../../app/controllers/jobPost.controller';

import { verifyToken } from '../../../app/middlewares/auth.middleware';
import { checkValidation } from '../../../app/middlewares/validator.middleware';
import {
  JobGetRequest,
  JobCreateRequest,
} from '../../../app/validators/job.validator';

router.post(
  '/',
  checkValidation(JobCreateRequest),
  verifyToken,
  JobController.create,
);
router.put('/:id', verifyToken, JobController.update);

router.get('/me', verifyToken, JobController.getMyJobs);

router.get(
  '/:id',
  // checkValidation(JobGetRequest),
  verifyToken,
  JobController.show,
);
router.get('/', verifyToken, JobController.index);
router.delete('/:id', verifyToken, JobController.delete);

export default router;

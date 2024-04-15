import * as express from 'express';

const router = express.Router();

import JobApplicationController from '../../../app/controllers/jobapplication.controller';

import { verifyToken } from '../../../app/middlewares/auth.middleware';
import { checkValidation } from '../../../app/middlewares/validator.middleware';
import { singleFileUpload } from '../../../app/middlewares/upload.middleware';
import {
  CreateRequest,
  FileSchema,
  UpdateRequest,
  GetRequest
} from '../../../app/validators/jobapplication';

router.post(
  '/',
  singleFileUpload(FileSchema),
  checkValidation(CreateRequest),
  verifyToken,
  JobApplicationController.create
);
router.patch(
  '/:id',
  singleFileUpload(FileSchema),
  checkValidation(UpdateRequest),
  verifyToken,
  JobApplicationController.update
);

router.get(
  '/:id',
  checkValidation(GetRequest),
  verifyToken,
  JobApplicationController.show
);
router.get('/', verifyToken, JobApplicationController.index);
router.delete(
  '/:id',
  checkValidation(GetRequest),
  verifyToken,
  JobApplicationController.delete
);

export default router;

import JobApplicationService from '../services/jobapplication.service';
import RequestHandler from '../helpers/request.handler';
import httpConstants from '../constant/http.constants';
import messagesConstants from '../constant/messages.constants';
import { Request, Response } from 'express';
import {
  JobApplicationRequest,
  JobApplicationSearchParams
} from '../types/jobapplication.type';
import { FileType } from '../types/file.type';

class JobApplicationController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const data: JobApplicationRequest = req.body;
      const file: FileType | undefined = req.file;
      const userId = req.cookies.id;
      data.user_id = userId;
      const jobApplication: JobApplicationRequest = await JobApplicationService.create(data, file);
      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_CREATED_OP,
        httpConstants.HTTP_SUCCESS_OK
      )(jobApplication);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  // ---------------------

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const file: FileType | undefined = req.file;
      const jobAppId = req.params.id;
      const userId = req.cookies.id;
      const data: JobApplicationRequest = {
        id: jobAppId,
        user_id: userId,
        ...req.body
      };
      await JobApplicationService.update(data, file);
      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_UPDATED_OP,
        httpConstants.HTTP_SUCCESS_OK
      )(req.body);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  // ---------------------

  public async show(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const userId = req.cookies.id;
      const result = await JobApplicationService.getById(
        Number(id),
        Number(userId)
      );

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_GET_OP,
        httpConstants.HTTP_SUCCESS_OK
      )(result);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  // ---------------------

  public async index(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.cookies.id;
      const { page, limit, job_post_id }: Partial<JobApplicationSearchParams> =
        req.query;
      const params = {
        userId: user_id,
        page: page,
        limit: limit,
        jobPostId: job_post_id
      };
      const result = await JobApplicationService.getAll(params);

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_GET_OP,
        httpConstants.HTTP_SUCCESS_OK
      )(result);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }

  // ---------------------

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const user_id = req.cookies.id;
      const result = await JobApplicationService.delete(
        Number(id),
        Number(user_id)
      );

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_DELETED_OP,
        httpConstants.HTTP_SUCCESS_OK
      )(result);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
}

export default new JobApplicationController();

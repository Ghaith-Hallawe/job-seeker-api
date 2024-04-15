import JobPostService from '../services/jobPost.service';
import RequestHandler from '../helpers/request.handler';
import httpConstants from '../constant/http.constants';
import messagesConstants from '../constant/messages.constants';
import { Request, Response } from 'express';
import { JobRequest } from '../types/job.type';
import { SearchParams } from '../../config/params.config';

class JobPostController {
  public async getMyJobs(req: Request, res: Response): Promise<void> {
    try {
      const id = req.cookies.id;
      const { page, limit, term }: SearchParams = req.query;

      const result = await JobPostService.getMyJobs({ id, page, limit, term });

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_GET_OP,
        httpConstants.HTTP_SUCCESS_OK,
      )(result);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const data: JobRequest = req.body;
      const userId = req.cookies.id;
      data.user_id = userId;
      const jobDetails = await JobPostService.create(data);

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_CREATED_OP,
        httpConstants.HTTP_SUCCESS_OK,
      )(jobDetails);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  // ---------------------

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const data: JobRequest = req.body;
      data.user_id = req.cookies.id;
      await JobPostService.update(data);

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_UPDATED_OP,
        httpConstants.HTTP_SUCCESS_OK,
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
      const result = await JobPostService.getById(Number(id), Number(userId));

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_GET_OP,
        httpConstants.HTTP_SUCCESS_OK,
      )(result);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  // ---------------------

  public async index(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, term }: SearchParams = req.query;

      const result = await JobPostService.getAll({ page, limit, term });

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_GET_OP,
        httpConstants.HTTP_SUCCESS_OK,
      )(result);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }

  // ---------------------

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const userId = req.cookies.id;
      const result = await JobPostService.delete(Number(id), Number(userId));

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_DELETED_OP,
        httpConstants.HTTP_SUCCESS_OK,
      )(result);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
}

export default new JobPostController();

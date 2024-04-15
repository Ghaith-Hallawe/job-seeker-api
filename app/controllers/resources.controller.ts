import ResourcesService from '../services/resources.service';
import RequestHandler from '../helpers/request.handler';
import httpConstants from '../constant/http.constants';
import messagesConstants from '../constant/messages.constants';
import { Request, Response } from 'express';

class ResourcesController {
  public async getJobPostResources(req: Request, res: Response): Promise<void> {
    try {
      const resources = await ResourcesService.getJobPostResources();

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_RESOURCES,
        httpConstants.HTTP_SUCCESS_OK,
      )(resources);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  public async getCountries(req: Request, res: Response): Promise<void> {
    try {
      const countries = await ResourcesService.getCountries();

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_COUNTRIES,
        httpConstants.HTTP_SUCCESS_OK,
      )(countries);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }

  // ---------------------
}

export default new ResourcesController();

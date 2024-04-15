import kycService from '../services/kyc.service';
import RequestHandler from '../helpers/request.handler';
import httpConstants from '../constant/http.constants';
import messagesConstants from '../constant/messages.constants';
import { Request, Response } from 'express';
import { CreateSumSubTokenResponse } from '../types/kyc.type';


class KycController {
  public async accessToken(req: Request, res: Response): Promise<void> {
    try {
      const tokenResponse: CreateSumSubTokenResponse =
        await kycService.createSumSubToken();

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_REFRESH_TOKEN,
        httpConstants.HTTP_SUCCESS_OK,
      )(tokenResponse);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  // ---------------------
}

export default new KycController();

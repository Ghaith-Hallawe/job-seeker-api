import Sumsub from '../modules/Sumsub';
import { CreateSumSubTokenResponse } from '../types/kyc.type';

const levelName = 'basic-kyc-level';


class KycService {

  public async createSumSubToken(): Promise<CreateSumSubTokenResponse> {
    const externalUserId = "random-JSToken-" + Math.random().toString(36).substr(2, 9);
    const accessTokenResponse: CreateSumSubTokenResponse = await Sumsub.createAccessToken(externalUserId, levelName, 1200);
    return accessTokenResponse;
  }
  
}

export default new KycService();

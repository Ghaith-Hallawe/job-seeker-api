import { CreateSumSubTokenResponse } from '../types/kyc.type';
import { SumsubClient } from '../http-client/sumsub.client';

class Sumsub {
  public async createApplicant(externalUserId: number, levelName: string) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const url = '/resources/applicants?levelName=' + levelName;
    const data = JSON.stringify({
      externalUserId: externalUserId
    });

    return (await SumsubClient.request({ method: 'post', headers, url, data }))
      .data;
  }
  // -----------------------------------

  public async getApplicantStatus(applicantId: number) {
    const url = `/resources/applicants/${applicantId}/status`;

    return (await SumsubClient.request({method: 'get', url})).data;
  }

  // -----------------------------------

  public async createAccessToken(
    externalUserId: string,
    levelName: string = 'basic-kyc-level',
    ttlInSecs: number = 600
  ): Promise<CreateSumSubTokenResponse> {
    const url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${levelName}`;

    return (await SumsubClient.request({ method: 'post', url })).data;
  }
  // -----------------------------------
}

export default new Sumsub();

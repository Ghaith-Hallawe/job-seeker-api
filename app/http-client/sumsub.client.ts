import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import FormData from 'form-data';

import appConfig from '../../config/app.config';

class Sumsub {

  private instance: AxiosInstance;
  private defaultConfig = {
    baseURL: appConfig.sumsub.base_url,
    headers: {
      'Accept': 'application/json',
      'X-App-Token': appConfig.sumsub.app_token
    },
    timeout: 10000
  };
  

  constructor() {
    this.instance = axios.create(this.defaultConfig);
    this.instance.interceptors.request.use(this.createSignature, function (error) {
      return Promise.reject(error);
    });
  }
  // -----------------------------------

  public createSignature(config: any) {
    const ts = Math.floor(Date.now() / 1000);
    const signature = crypto.createHmac('sha256',  appConfig.sumsub.secret_key || '');
    signature.update(ts + config.method.toUpperCase() + config.url);
  
    if (config.data instanceof FormData) {
      signature.update(config.data.getBuffer());
    } else if (config.data) {
      signature.update(config.data);
    }
  
    config.headers['X-App-Access-Ts'] = ts;
    config.headers['X-App-Access-Sig'] = signature.digest('hex');
  
    return config;
  }
  // -----------------------------------

  public async request(config: AxiosRequestConfig) {
    return (await this.instance(config));
  }
  // -----------------------------------

}

export const SumsubClient = new Sumsub();
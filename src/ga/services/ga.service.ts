import { Injectable, HttpService } from '@nestjs/common';
import { CLIENT_EMAIL } from '../../config/env';
import { GaMetricPeriod } from '../dto/ga-metric-period';
const { google } = require('googleapis');
const SERVICE_ACCOUNT_KEY_FILE = __dirname+'/../../../key.pem';
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
    const jwt = new google.auth.JWT(CLIENT_EMAIL, SERVICE_ACCOUNT_KEY_FILE, null, scopes);
    const view_id = '216836193';
    
@Injectable()
export class GaService {
  constructor(
    private http: HttpService
  ) {}

  async getGAData(period: GaMetricPeriod): Promise<any> {
    const response = await jwt.authorize()
    const { data } = await google.analytics('v3').data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + view_id,
      ...period,
      'metrics': 'ga:pageviews'
    })
    const { totalsForAllResults } = data;
    return totalsForAllResults["ga:pageviews"];
  }
}

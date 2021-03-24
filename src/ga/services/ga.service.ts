import { Injectable, HttpService } from '@nestjs/common';
import { CLIENT_EMAIL } from '../../config/env';
import { GaMetricPeriod } from '../dto/ga-metric-period';
const { google } = require('googleapis');
const SERVICE_ACCOUNT_KEY_FILE = __dirname+'/../../../key.pem';
    const scopes = ['https://www.googleapis.com/auth/analytics.readonly', 'https://www.googleapis.com/auth/analytics.edit'];
    const jwt = new google.auth.JWT("analytics@coq-trotteur.iam.gserviceaccount.com", SERVICE_ACCOUNT_KEY_FILE, null, scopes);
    const view_id = '216836193';
    
@Injectable()
export class GaService {
  constructor(
    private http: HttpService
  ) {}

  async getGANewUsers(period: GaMetricPeriod): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + view_id,
      ...period,
      'metrics': 'ga:newUsers',
      'dimensions': 'ga:date'
    })
    const { totalsForAllResults } = data;
    return data // totalsForAllResults["ga:pageviews"];
  }

  async getBounceRate(period: GaMetricPeriod): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + view_id,
      ...period,
      'metrics': 'ga:bounceRate',
      'dimensions': 'ga:pagePath'
    })
    const { totalsForAllResults } = data;
    return data // totalsForAllResults["ga:pageviews"];
  }

  async getGAPageViews(period: GaMetricPeriod): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + view_id,
      ...period,
      'metrics': 'ga:pageViews',
      'dimensions': 'ga:pagePath'
    })
    const { totalsForAllResults } = data;
    return data // totalsForAllResults["ga:pageviews"];
  }


  async getGAAudienceSource(period: GaMetricPeriod): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics({version: 'v3'}).data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + view_id,
      ...period,
      'metrics': 'ga:userAcquisitionSource',
      'dimensions': 'ga:acquisitionSourceMedium'
    })
    const { totalsForAllResults } = data;
    return data // totalsForAllResults["ga:pageviews"];
  }

  async getGAData(period: GaMetricPeriod): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + view_id,
      ...period,
      'metrics': 'ga:sessions',
      'dimensions': 'ga:sessionDurationBucket'
    })
    const { totalsForAllResults } = data;
    return data // totalsForAllResults["ga:pageviews"];
  }

  async getGAProps(period: GaMetricPeriod): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').management.webproperties.get({
      'auth': jwt,
      'accountId': '192728133',
      'webPropertyId': 'UA-192728133-1'
    })
    return data;
  }

  async insertProp(resource: any): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').management.webproperties.insert({
      'auth': jwt,
      'accountId': '192728133',
      resource
    });
    const view = await this.insertView(data.id, data.accountId, data.websiteUrl);
    await this.updateProp(data.accountId, data.id, { defaultProfileId: view.id, name: resource.name, websiteUrl: resource.websiteUrl });
    return data;
  }

  async updateProp(accountId: string, webPropertyId: string, resource: any): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').management.webproperties.update({
      'auth': jwt,
      accountId,
      webPropertyId,
      resource,
    });
    return data;
  }

  async insertView(webPropertyId: string, accountId: string, websiteUrl: string): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').management.profiles.insert({
      'auth': jwt,
      accountId,
      webPropertyId,
      'resource': {
        'name': 'Toutes les données du site Web',
        'eCommerceTracking': true,
        'enhancedECommerceTracking': true,
        'currency': 'EUR',
        websiteUrl,
        'timezone': 'Europe/Paris'
      }
    })
    return data;
  }

  async updateView(profileId: string, webPropertyId: string, accountId: string, websiteUrl: string): Promise<any> {
    await jwt.authorize()
    const { data } = await google.analytics('v3').management.profiles.update({
      'auth': jwt,
      accountId,
      webPropertyId,
      profileId,
      'resource': {
        'name': 'Toutes les données du site Web',
        'eCommerceTracking': true,
        'enhancedECommerceTracking': true,
        'currency': 'EUR',
        websiteUrl,
        'timezone': 'Europe/Paris'
      }
    })
    return data;
  }
}

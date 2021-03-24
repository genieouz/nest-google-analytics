import { Controller, Get, Query, Post } from '@nestjs/common';
import { GaService } from '../services/ga.service';
import { GaMetricPeriod } from '../dto/ga-metric-period';

@Controller('ga')
export class GaController {
    constructor(private readonly gaService: GaService) {}
    @Get('pageviews')
    getGAData(@Query() queryParams: GaMetricPeriod) {
        return this.gaService.getGAPageViews(queryParams);
    }

    @Get('new-users')
    getNewUsers(@Query() queryParams: GaMetricPeriod) {
        return this.gaService.getGANewUsers(queryParams);
    }

    @Get('bounce-rate')
    getBounceRate(@Query() queryParams: GaMetricPeriod) {
        return this.gaService.getBounceRate(queryParams);
    }

    @Get('audience-source')
    getAudienceSource(@Query() queryParams: GaMetricPeriod) {
        return this.gaService.getGAAudienceSource(queryParams);
    }

    @Get('props')
    getGAProps(@Query() queryParams: GaMetricPeriod) {
        return this.gaService.getGAProps(queryParams);
    }

    @Post('props')
    insertGAProp(@Query() queryParams: GaMetricPeriod) {
        return this.gaService.insertProp({
            'websiteUrl': 'https://coq-custom-6038fb5243f3401ecb54e6ea.netlify.app',
            'name': 'geneog3'
          });
    }
}

import { Controller, Get, Query } from '@nestjs/common';
import { GaService } from '../services/ga.service';
import { GaMetricPeriod } from '../dto/ga-metric-period';

@Controller('ga')
export class GaController {
    constructor(private readonly gaService: GaService) {}
    @Get('pageviews')
    getGAData(@Query() queryParams: GaMetricPeriod) {
        return this.gaService.getGAData(queryParams);
    }
}

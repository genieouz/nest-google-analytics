import { IsDate } from 'class-validator';

export class GaMetricPeriod {
    @IsDate()
    start_date: Date = new Date('1960-01-01');

    @IsDate()
    end_date: Date = new Date('2100-01-01');
}

import { Temperature } from '../../../shared/models/temperature.model';

export class DailyForecast {
    constructor(public date: Date, public temperature: Temperature) {
    }
}
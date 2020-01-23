import { Temperature } from 'src/app/shared/models/temperature';

export class DailyForecast {
    constructor(public date: Date, public temperature: Temperature) {
    }
}
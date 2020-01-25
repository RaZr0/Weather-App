import { Temperature } from '../../../shared/models/temperature.model';

export class FavouriteLocation {
    constructor(public id: string, public name: string, public temperature: Temperature, public pharse?: string) {
    }
}
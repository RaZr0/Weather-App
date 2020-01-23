import { Temperature } from 'src/app/shared/models/temperature';

export class FavouriteLocation {
    constructor(public id: string, public name: string, public temperature: Temperature, public pharse?: string) {
    }
}
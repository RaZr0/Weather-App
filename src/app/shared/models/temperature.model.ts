export type TemperatureUnit = 'C' | 'F';

export class Temperature {
    constructor(public value: number, public unit: TemperatureUnit) {
    }
}
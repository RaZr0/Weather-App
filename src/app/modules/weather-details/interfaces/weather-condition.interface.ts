export interface IMetric {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface IImperial {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface ITemperature {
    Metric: IMetric;
    Imperial: IImperial;
}

export interface IWeatherCondition{
    LocalObservationDateTime: Date;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType?: any;
    IsDayTime: boolean;
    Temperature: ITemperature;
    MobileLink: string;
    Link: string;
}
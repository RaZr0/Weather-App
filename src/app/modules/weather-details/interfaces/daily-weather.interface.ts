export interface IHeadline {
    EffectiveDate: Date;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: Date;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
}

export interface IMinimum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface IMaximum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface ITemperature {
    Minimum: IMinimum;
    Maximum: IMaximum;
}

export interface IDay {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
}

export interface INight {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
}

export interface IDailyForecast {
    Date: Date;
    EpochDate: number;
    Temperature: ITemperature;
    Day: IDay;
    Night: INight;
    Sources: string[];
    MobileLink: string;
    Link: string;
}

export interface IDailyWeather {
    Headline: IHeadline;
    DailyForecasts: IDailyForecast[];
}
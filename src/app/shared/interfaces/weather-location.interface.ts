export interface ICountry {
    ID: string;
    LocalizedName: string;
}

export interface IAdministrativeArea {
    ID: string;
    LocalizedName: string;
}

export interface IWeatherLocation {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: ICountry;
    AdministrativeArea: IAdministrativeArea;
}
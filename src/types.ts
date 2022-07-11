export interface Region {
  value: string;
}
export interface CountryLanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface CountryCurrencies {
  code: string;
  name: string;
  symbol: string;
}

export interface ICountry {
  alpha3Code: string;
  name: string;
  capital: string;
  region: string;
  flag: string;
  population: number;
  borders: string[];
  languages: CountryLanguage[];
  currencies: CountryCurrencies[];
}

export type ICountryState = {
  countries: ICountry[];
};

export interface Selected extends ICountry {
  selected: boolean;
}

export type SelectedState = {
  selected: ICountry[];
};

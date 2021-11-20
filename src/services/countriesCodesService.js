import pick from 'lodash/pick';

class CountriesCodesService {
  constructor() {
    this.extractCountriesFromResponse = this.extractCountriesFromResponse.bind(this);
    this._extractSingleCountryFromResponse = this._extractSingleCountryFromResponse.bind(this);
  }

  _extractSingleCountryFromResponse( countryResponse ){
    return pick(countryResponse, ['name', 'alpha2Code', 'flag']);
  }

  extractCountriesFromResponse( countriesResponse ){
    return Array.isArray(countriesResponse)
      ? countriesResponse.map( this._extractSingleCountryFromResponse)
      : this._extractSingleCountryFromResponse( countriesResponse);
  }  
}

export const countriesCodesService = new CountriesCodesService();
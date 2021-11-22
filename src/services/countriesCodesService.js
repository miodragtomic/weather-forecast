import pick from 'lodash/pick';

class CountriesCodesService {
  constructor() {
    this.extractCountriesFromResponse = this.extractCountriesFromResponse.bind(this);
    this._extractSingleCountryFromResponse = this._extractSingleCountryFromResponse.bind(this);

    this.extractCityGeocodeInfo = this.extractCityGeocodeInfo.bind(this);
    this.__extractSingleGeocodingObj = this.__extractSingleGeocodingObj.bind(this);
  }

  _extractSingleCountryFromResponse( countryResponse ){
    return pick(countryResponse, ['name', 'alpha2Code', 'flag', 'latlng']);
  }

  extractCountriesFromResponse( countriesResponse ){
    return Array.isArray(countriesResponse)
      ? countriesResponse.map( this._extractSingleCountryFromResponse)
      : this._extractSingleCountryFromResponse( countriesResponse);
  }  

  __extractSingleGeocodingObj( geocodeObj){
    return pick(geocodeObj, ['display_name', 'lat','lon', 'icon']);
  }

  extractCityGeocodeInfo( geocodingResponse){
    if(Array.isArray(geocodingResponse)){
      if(geocodingResponse.length === 0) throw new Error("City geocodes not found");
      return this.__extractSingleGeocodingObj(geocodingResponse.shift() );
    
    }else if(typeof geocodingResponse === 'object'){
      if('lat' in geocodingResponse && 'lon' in geocodingResponse){
        return this._extractSingleCountryFromResponse(geocodingResponse);
      }else {
        throw new Error("Geocoding response unknown");
      }
    
    }else {
      throw new Error("Geocoding response unknown");
    }
  }
}

export const countriesCodesService = new CountriesCodesService();
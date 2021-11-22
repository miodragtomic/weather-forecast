import { countriesCodesApi } from "../api/countriesCodesApi";
import { countriesCodesService } from "../services/countriesCodesService";

export const FETCH_COUNTRIES_CODES_PENDING = 'FETCH_COUNTRIES_CODES_PENDING';
export const FETCH_COUNTRIES_CODES_FULFILLED = 'FETCH_COUNTRIES_CODES_FULFILLED';
export const FETCH_COUNTRIES_CODES_REJECTED = 'FETCH_COUNTRIES_CODES_REJECTED';
export const SET_SELECTED_COUNTRY_CODE = 'SET_SELECTED_COUNTRY_CODE';
export const STORE_LAST_MATCHED_GEOCODE = 'STORE_LAST_MATCHED_GEOCODE';


class CountriesCodesActions {
  constructor(){
    this.fetchCountiresCodes = this.fetchCountiresCodes.bind(this);
    this.setSelectedCountryCode = this.setSelectedCountryCode.bind(this);

    this.tryGeolocateCity = this.tryGeolocateCity.bind(this);    
  }

  _startFetchingCountriesCode(){
    return {
      type: FETCH_COUNTRIES_CODES_PENDING
    }
  }

  _storeCountriesCode(countriesCodesList){
    return {
      type: FETCH_COUNTRIES_CODES_FULFILLED,
      payload: countriesCodesList
    }
  }

  _errorCountriesCodes(error){
    return {
      type: FETCH_COUNTRIES_CODES_REJECTED,
      payload: error.message
    }
  }

  fetchCountiresCodes(){
    return async function(dispatch){      
      dispatch(this._startFetchingCountriesCode())
      try {
        const countriesCodesList = await countriesCodesApi.fetchTownsCodes();

        dispatch( this._storeCountriesCode(countriesCodesList))
      }catch(error){
        dispatch(this._errorCountriesCodes(error.message))
      }
    }.bind(this);
  }

  setSelectedCountryCode( countryCode){
    return {
      type: SET_SELECTED_COUNTRY_CODE,
      payload:  countryCode
    }
  }

  tryGeolocateCity(cityName){
    return async (dispatch, getState) => {
      const { countriesCodes, selectedCountryCode } = getState().countriesCodes;

      const countryName = countriesCodes.find( ccItem => ccItem.alpha2Code === selectedCountryCode ).name;
      let geocodeObj;
      try{
        const geocodeResponse = await countriesCodesApi.fetchCityGeocodes(countryName, cityName);

        geocodeObj = countriesCodesService.extractCityGeocodeInfo(geocodeResponse);
        dispatch(this.storeLastMatchedCityGeocodeInfo( geocodeObj));
      }
      catch(error){
        dispatch(this.storeLastMatchedCityGeocodeInfo( {
          display_name: "The city could not be located"
        }));
        throw error;
      }

      return geocodeObj;
    }
  }

  storeLastMatchedCityGeocodeInfo(geocodeObj){
    return {
      type: STORE_LAST_MATCHED_GEOCODE,
      payload: geocodeObj      
    }
  }

}

export const countriesCodesActions = new CountriesCodesActions();
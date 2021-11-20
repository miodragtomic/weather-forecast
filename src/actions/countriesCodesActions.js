import { countriesCodesApi } from "../api/countriesCodesApi";

export const FETCH_COUNTRIES_CODES_PENDING = 'FETCH_COUNTRIES_CODES_PENDING';
export const FETCH_COUNTRIES_CODES_FULFILLED = 'FETCH_COUNTRIES_CODES_FULFILLED';
export const FETCH_COUNTRIES_CODES_REJECTED = 'FETCH_COUNTRIES_CODES_REJECTED';
export const SET_SELECTED_COUNTRY_CODE = 'SET_SELECTED_COUNTRY_CODE';


class CountriesCodesActions {
  constructor(){
    this.fetchCountiresCodes = this.fetchCountiresCodes.bind(this);
    this.setSelectedCountryCode = this.setSelectedCountryCode.bind(this);
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

}

export const countriesCodesActions = new CountriesCodesActions();
import { weatherApi } from "../api/weatherApi";

export const FETCH_COUNTRIES_CODES_PENDING = 'FETCH_COUNTRIES_CODES_PENDING';
export const FETCH_COUNTRIES_CODES_FULFILLED = 'FETCH_COUNTRIES_CODES_FULFILLED';
export const FETCH_COUNTRIES_CODES_REJECTED = 'FETCH_COUNTRIES_CODES_REJECTED';


class CountriesCodesActions {
  constructor(){
    this.fetchCountiresCodes = this.fetchCountiresCodes.bind(this);
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
        const countriesCodesList = await weatherApi.fetchTownsCodes();

        dispatch( this._storeCountriesCode(countriesCodesList))
      }catch(error){
        dispatch(this._errorCountriesCodes(error))
      }
    }
  }

}

export const contriesCodesActions = new CountriesCodesActions();
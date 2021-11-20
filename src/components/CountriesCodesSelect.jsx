import { Select } from './Select';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { countriesCodesActions } from '../actions/countriesCodesActions';

const iconUrlSelector = countryCodeObj => countryCodeObj.flag;
const iconHintSelector = countryCodeObj => countryCodeObj.name;
const valueSelector = coutnryCodeObj => coutnryCodeObj.alpha2Code;
const keySelector = valueSelector;
const titleSelector = valueSelector;

/// To avoid parent rerendering on every select change, changing state is encapsulated here
export function CountriesCodesSelect(props) {
  const countriesCodes = useSelector( store => store.countriesCodes.countriesCodes);
  const selectedCountryCode = useSelector( store => store.countriesCodes.selectedCountryCode);

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(countriesCodesActions.fetchCountiresCodes());
  }, []);

  const onChangeSelectedHandler = (value) => {
    dispatch(countriesCodesActions.setSelectedCountryCode(value));
  }

  return (
    <Select 
      value={selectedCountryCode}
      onChange={onChangeSelectedHandler}

      iconUrlSelector={iconUrlSelector}
      iconHintSelector={iconHintSelector}
      keySelector={keySelector}
      valueSelector={valueSelector}
      titleSelector={titleSelector}    
    >
      {
        countriesCodes
      }    
    </Select>
  )  
}
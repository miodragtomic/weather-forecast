import { Select } from './Select';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { countriesCodesActions } from '../actions/countriesCodesActions';
import { SpinnerIcon } from './SearchableIcon/SpinnerIcon'
import selectStyles from './Select/Select.module.css'
import styles from './CountriesCodesSelect.module.css';
import clsx from 'clsx';

const iconUrlSelector = countryCodeObj => countryCodeObj.flag;
const iconHintSelector = countryCodeObj => countryCodeObj.name;
const valueSelector = countryCodeObj => countryCodeObj.alpha2Code;
const keySelector = valueSelector;
const titleSelector = valueSelector;

/// To avoid parent rerendering on every select change, changing state is encapsulated here
export function CountriesCodesSelect(props) {
  const countriesCodes = useSelector( store => store.countriesCodes.countriesCodes);
  const selectedCountryCode = useSelector( store => store.countriesCodes.selectedCountryCode);
  const loading = useSelector( store => store.countriesCodes.loading);

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(countriesCodesActions.fetchCountiresCodes());
  }, []);

  const onChangeSelectedHandler = (value) => {
    dispatch(countriesCodesActions.setSelectedCountryCode(value));
  }

  if(loading){
    return (
      <div className={clsx(selectStyles['select-container'], styles['countries-codes-spinner-container'] )}> 
        <SpinnerIcon /> 
      </div>
    )
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
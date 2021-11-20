import styles from './InputField.module.css';
import { SearchableIcon } from '../SearchableIcon';
import { useRef } from 'react'

export function InputField(props){
  const {
    placeholder,
    value,    
    onChange,
    onSubmitValue
  } = props;

  const inputRef = useRef();

  const onChangeHandler = (event) => {
    onChange && onChange(event.target.value);
  }

  const onKeyHandler = (event) => {
    if(event.key === "Enter") {
      onSubmitValueHandler();      
    }
  }

  const onSubmitValueHandler = () => {
    if(onSubmitValue){
      onSubmitValue(inputRef.current.value);
    }
  }

  return (
  <div className={styles['input-field-container']}>    
    <input
      className={styles['input-field']} 
      ref={inputRef} 
      type='text' 
      placeholder={placeholder}
      value={value} 
      onChange={onChangeHandler}
      onKeyDown={onKeyHandler}
    />    
    <SearchableIcon onClick={onSubmitValueHandler}/>    
  </div>)
}
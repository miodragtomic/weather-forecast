import styles from './InputField.module.css';
import { SearchableIcon } from '../SearchableIcon';

export function InputField(props){
  const {
    placeholder,
    value,
    ref,
    onChange
  } = props;

  return (
  <div className={styles['input-field-container']}>    
    <input
      className={styles['input-field']} 
      ref={ref} 
      type='text' 
      placeholder={placeholder}
      value={value} 
    />    
    <SearchableIcon />    
  </div>)
}
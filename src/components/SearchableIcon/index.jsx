import styles from './SearchableIcon.module.css';
import { SpinnerIcon } from './SpinnerIcon';
import { SearchIcon } from './SeachIcon';
import { useSelector } from 'react-redux';

export function SearchableIcon(props){  
  const loading = useSelector( store => store.weather.loading)

  const onClickHandler = (e) => {
    props.onClick && props.onClick(e);
  }

  return (
  <div className={styles['searchable-icon']} onClick={onClickHandler}>
    {
      loading 
        ? (<SpinnerIcon />)
        : (<SearchIcon />)
    }
  </div>)
}
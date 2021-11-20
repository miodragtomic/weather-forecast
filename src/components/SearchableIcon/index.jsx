import styles from './SearchableIcon.module.css';
import { SpinnerIcon } from './SpinnerIcon';
import { SearchIcon } from './SeachIcon';

export function SearchableIcon(props){
  const loading = false;

  return (
  <div className={styles['searchable-icon']}>
    {
      loading 
        ? (<SpinnerIcon />)
        : (<SearchIcon />)
    }
  </div>)
}
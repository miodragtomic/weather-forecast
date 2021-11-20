import styles from './SearchableIcon.module.css';
import { SpinnerIcon } from './SpinnerIcon';

export function SearchableIcon(props){
  const loading = true;

  return (
  <div className={styles['searchable-icon']}>
    {
      loading 
        ? (<SpinnerIcon />)
        : (<SearchableIcon />)
    }
  </div>)
}
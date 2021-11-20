import styles from './SpinnerIcon.module.css'

export function SpinnerIcon(props){
 
  return (  
  <div className={styles['loader-container']}>
    <div className={styles["loader"]}></div>  
  </div>
);

}
import styles from './MainContainer.module.css';

export function MainContainer(props){
  return (
    <div className={styles['main-container']}>
      {props.children}
    </div>
  )
}
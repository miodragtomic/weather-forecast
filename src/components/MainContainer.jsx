import styles from './MainContainer.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

export function MainContainer(props){
  const initialState = useSelector( store => store.weather.initialState)
  return (
    <div className={clsx(styles['main-container'], initialState && styles['main-container-center-adj'], !initialState && styles['main-container-hight-adj'])}>
      {props.children}
    </div>
  )
}
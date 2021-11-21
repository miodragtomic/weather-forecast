import clsx from 'clsx';
import styles from './TemperatureCard.module.css';

export function TemperatureCard(props){
  const {
    title,
    temperature,    
    size
  } = props;

  
  let containerClasses;
  let titleClasses;
  let temperatureClasses;
  let numberClasses;
  let degreeClasses;
  let degreeLetterClasses;
  if(size === 'large'){
    containerClasses = clsx(styles['temperaturecard-container'], styles['temperaturecard-container-size-large']);
    titleClasses = clsx(styles['temperaturecard-title'], styles['temperaturecard-title-size-large']);
    temperatureClasses = clsx(styles['temperaturecard-temperature'], styles['temperaturecard-temperature-size-large']);
    numberClasses = clsx(styles['temperaturecard-temperature-number'], styles['temperaturecard-temperature-number-size-large']);
    degreeClasses = clsx(styles['temperaturecard-degree'], styles['temperaturecard-degree-size-large']);
    degreeLetterClasses = clsx(styles['temperaturecard-degreeletter'], styles['temperaturecard-degreeletter-size-large']);
  }else {
    containerClasses = clsx(styles['temperaturecard-container'], styles['temperaturecard-container-size']);
    titleClasses = clsx(styles['temperaturecard-title'], styles['temperaturecard-title-size']);
    temperatureClasses = clsx(styles['temperaturecard-temperature'], styles['temperaturecard-temperature-size']);
    numberClasses = clsx(styles['temperaturecard-temperature-number'], styles['temperaturecard-temperature-number-size']);
    degreeClasses = clsx(styles['temperaturecard-degree'], styles['temperaturecard-degree-size']);
    degreeLetterClasses = clsx(styles['temperaturecard-degreeletter'], styles['temperaturecard-degreeletter-size']);
  }


  return (
  <div className={containerClasses}>
      <div className={titleClasses}>{title}</div>      
      <div className={temperatureClasses}>
        <div className={numberClasses}>
          {temperature}<span className={degreeClasses}>&deg;</span>
        </div>                         
        <div className={degreeLetterClasses}>C</div>
      </div>
  </div>
  )
}
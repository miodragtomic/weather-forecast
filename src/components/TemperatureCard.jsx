import styles from './TemperatureCard.module.css';

export function TemperatureCard(props){
  const {
    title,
    temperature,    
  } = props;

  return (
  <div className={styles['temperaturecard-container']}>
      <div className={styles['temperaturecard-title']}>{title}</div>      
      <div className={styles['temperaturecard-temperature']}>
        <div className={styles['temperaturecard-temperature-number']}>
          {temperature}<span className={styles['temperaturecard-degree']}>&deg;</span>
        </div>                         
        <div className={styles['temperaturecard-degreeletter']}>C</div>
      </div>
  </div>
  )
}
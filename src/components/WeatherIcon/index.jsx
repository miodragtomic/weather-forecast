import styles from './WeatherIcon.module.css';
import { DEFAULT_ICONS_SIZE } from '../../config/appSettings'

export function WeatherIcon(props){
  const {
    src,
    width,
    alt,
    height
  } = props;

  return (
    <div className={styles['weather-icon-container']}>
      <img
        className={styles['weather-icon']}        
        src={src}         
        width={width || DEFAULT_ICONS_SIZE} 
        height={height || DEFAULT_ICONS_SIZE}
        alt={alt}
      />
    </div>
  )
}

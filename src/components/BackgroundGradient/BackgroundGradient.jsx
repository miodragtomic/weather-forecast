import styles from './BackgroundGradient.module.css';
import React, { useEffect } from 'react';
import { gradientService as gs } from '../../services.js/gradientService';
import { useSelector } from 'react-redux';


export function BackgroundGradient(props){
  const { children, ...restProps } = props;
  const gradientPoints = useSelector( store => store.weather.gradientPoints);
  
  const style = { 
    backgroundImage: gs.generateGradientValue(gradientPoints)
  };
  
  return (
  <div style={style} className={styles['gradient-background']}>
    { React.isValidElement(children)
        ? React.cloneElement(children, restProps)
        : children }
  </div>)
}

import styles from './Select.module.css';
import { useState, useMemo } from 'react';

export function Select(props){
  const {
    placeholder,
    value,
    onChange,    
    children, 
    
    keySelector,
    valueSelector,
    titleSelector,

    iconUrlSelector,
    iconHintSelector,
    iconHeight = 24,
    iconWidth = 24,    
  } = props;

  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  }

  const onSelectedHandler = (event) => {
    if(onChange) {
      onChange(event.target.value);
    }
  }
  

  const headerTitle = useMemo( () => {
    if(value == null)  return "";
    
    return titleSelector(children?.find( child => valueSelector(child) === value ));
  }, [value, valueSelector, titleSelector, children])

  const iconUrl = useMemo( () => {
    if(value == null)  return "";
    
    return iconUrlSelector && iconUrlSelector(children?.find( child => valueSelector(child) === value ));
  }, [value, valueSelector, iconUrlSelector, children])

  const iconHint = useMemo( () => {
    if(value == null)  return "";
    
    return iconHintSelector && iconHintSelector(children?.find( child => valueSelector(child) === value ));
  }, [value, valueSelector, iconHintSelector, children])




  return (
    <div className={styles['select-container']}>
      <SelectHeader
        title={value && headerTitle || placeholder} 
        iconUrl={iconUrl}
        iconHint={iconHint}
        iconHeight={iconHeight}
        iconWidth={iconWidth}
        />
      { open && (
        <SelectContent 
          iconUrlSelector={iconUrlSelector}
          iconHintSelector={iconHintSelector}
          iconHeight={iconHeight}
          iconWidth={iconWidth}
          
          keySelector={keySelector}
          valueSelector={valueSelector}
          titleSelector={titleSelector}
          >
            {children}
          </SelectContent>
        )
      }
    </div>
  )  
}
function SelectHeader(props) {
  const {
    iconUrl,
    iconHint,
    iconHeight,
    iconWidth,
    title,
  } = props;

  return (
    <div className={styles['select-header']}>
      {
        iconUrl && (
          <img 
            className={styles['select-content-listitem-atom']}
            src={iconUrl} 
            height={iconHeight} 
            width={iconWidth} 
            alt={iconHint}
          />)
      }
      <div className={styles['select-contant-listitem-atom']}>{title}</div>
    </div>
  )
}

function SelectContent(props){
  const {
    iconUrlSelector,
    iconHintSelector,
    iconHeight,
    iconWidth,

    keySelector,
    valueSelector,
    titleSelector,
    children
  } = props;
  
  return (
    <ul className={styles['select-content']}>
      {
        children?.map( child => (
        <li 
          className={styles['select-content-listitem']}
          key={keySelector(child)} 
          value={valueSelector(child)}
        > 
        {
          iconUrlSelector && (
            <img 
              className={styles['select-content-listitem-atom']}
              src={iconUrlSelector(child)} 
              alt={iconHintSelector(child)} 
              width={iconWidth}
              height={iconHeight}
            />
          )
        }
          <div className={styles['select-contant-listitem-atom']}>{titleSelector(child)}</div>
        </li>
        ))
      }
    </ul>
  )
}
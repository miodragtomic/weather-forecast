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
    iconHeight,
    iconWidth,    
  } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  }

  const onSelectedHandler = (event) => {
    if(onChange) {
      onChange(event.target.value);
    }
  }
  
  const headerTitle = useMemo( () => {    
    return titleSelector(children.find( child => valueSelector(child) === value ));
  }, [value, keySelector, titleSelector, children])

  return (
    <div className={styles['select-container']}>
      <SelectHeader
        title={value && headerTitle || placeholder} 
        iconUrlSelector={iconUrlSelector}
        iconHintSelector={iconHintSelector}
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
    <div>
      {
        iconUrl && (
          <img 
            src={iconUrl} 
            height={iconHeight} 
            width={iconWidth} 
            alt={iconHint}
          />)
      }
      {title}
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
    <ul>
      {
        children.map( child => (
        <li 
          key={keySelector(child)} 
          value={valueSelector(child)}
        > 
        {
          iconUrlSelector && (
            <img 
              src={iconUrlSelector(child)} 
              alt={iconHintSelector(child)} 
              width={iconWidth}
              height={iconHeight}
            />
          )
        }
          {titleSelector(child)}
        </li>
        ))
      }
    </ul>
  )
}
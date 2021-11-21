import styles from './Select.module.css';
import { useState, useMemo } from 'react';
import clsx from 'clsx';

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

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  }

  const onSelectedHandler = (value) => {
    if(onChange) {
      onChange(value);
    }

    setOpen(false);
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
        open={open}
        title={value && headerTitle || placeholder} 
        iconUrl={iconUrl}
        iconHint={iconHint}
        iconHeight={iconHeight}
        iconWidth={iconWidth}
        onOpenChange={toggleOpen}
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

          onChange={onSelectedHandler}
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
    open,
    onOpenChange,
    iconUrl,
    iconHint,
    iconHeight,
    iconWidth,
    title,
  } = props;

  const onDoubleClickHandler = (event) => {
    clearSelectionHandler();
  }

  const onClickHandler = (event) => {
    clearSelectionHandler();
    onOpenChange();
  }

  const clearSelectionHandler = () => {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
  }

  return (
    <div className={styles['select-header']} onClick={onClickHandler} onDoubleClick={onDoubleClickHandler}>
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
      <span className={clsx(styles["down-caret"], open && styles["open-caret"])}></span>
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
    children,

    onChange
  } = props;

  const onClickHandler = (event) => {    
    if(onChange) onChange(event.target.innerText);
  }
  
  return (
    <ul className={styles['select-content']}>
      {
        children?.map( child => (        
        <li 
          className={styles['select-content-listitem']}
          key={keySelector(child)} 
          value={valueSelector(child)}
          onClick={onClickHandler}
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
          <span className={clsx(styles["down-caret"],styles["caret-placehlder-adj"])}></span>
        </li>
        ))
      }
    </ul>
  )
}
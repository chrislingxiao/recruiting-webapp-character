import { useEffect, useState } from 'react';
import {CLASS_LIST} from '../consts';

const ClassesComp = ({currAttr}) => {
  
  const classArr = [];
  const [redClasses, setRedClass] = useState({});

  for(const key in CLASS_LIST)  {
    classArr.push({
      classKey: key,
      value: CLASS_LIST[key]
    });
    setRedClass(prev => {
      return {...prev, [key]: false};
    })
  }


  useEffect(() => {
    classArr.forEach(({classKey, value}) => {
      let hasBigger = false;
      for(const attr in value) {
        for(const currAttrItem in currAttr) {
          if(currAttrItem > attr) {
            hasBigger = true;
          }
        }
      }
      if(hasBigger) {
        setRedClass(prev => {
          return {...prev, [classKey]: true};
        })
      } else {
        setRedClass(prev => {
          return {...prev, [classKey]: false};
        })
      }
    });

  }, [currAttr]);


  return (
    <div className='classes-container'>
      <h2>Attributes</h2>
      <ul>
        {classArr.map(({classKey})=> (
          <li className={redClasses[classKey] && 'red'}>{classKey}</li>
        ))}
      </ul>
    </div>
    
  )
}

export default ClassesComp;
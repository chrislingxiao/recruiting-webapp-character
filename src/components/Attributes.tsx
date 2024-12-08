import { useState } from 'react';
import {ATTRIBUTE_LIST} from '../consts';

const AttributesComp = ({handleAttrChange}) => {
  const attributes = new Map(ATTRIBUTE_LIST.map(attr => [
    attr, {
      name: attr,
      power: 10,
      modifier: 0
    }
  ]));

  const [currAttributes, setAttributes] = useState(attributes);

  const checkPointIsValid = (modifiedAttr) => {
    let total = 0;
    modifiedAttr.forEach((value) => {
      total += value.power;
    });
    if((total+1 > 70) || (total+2 > 70)) {
      const e = new Error("Could not larger than 70");
      throw e;
    }
  }

  const changeModifier = (id: string, change: number): void => {
    const modifiedAttr = currAttributes.get(id);
    if(change === -1) {
      if (modifiedAttr.power in [10, 11, 12]) {
        modifiedAttr.power -= 1;
      } else {
        modifiedAttr.power -= 2;
      }
    } else if (change === 1) {
      checkPointIsValid(modifiedAttr);
      if (modifiedAttr.power in [9, 10, 11]) {
        modifiedAttr.power += 1;
      } else {
        modifiedAttr.power += 2;
      }
    }
    modifiedAttr.modifier += change;

    currAttributes.set(id, modifiedAttr);

    setAttributes(() => currAttributes);

    handleAttrChange(currAttributes);
  } 
  return (
    <div className="attribute-container">
      <h2>Attributes</h2>
      <ul>
        {Array.from(currAttributes).map(([id, {name, power, modifier}]) => (
          <li>
            {name}: {power}
            (Modifier: {modifier})
            <button onClick={() => changeModifier(id, 1)}>+</button>
            <button onClick={() => changeModifier(id, -1)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AttributesComp;
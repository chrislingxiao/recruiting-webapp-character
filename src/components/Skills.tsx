import { useState } from 'react';
import {SKILL_LIST} from '../consts'

const SkillsComp = ({currAttr, handleSkillChange}) => {

  const skillPoints = SKILL_LIST.map(skill => {
    return {
      name: skill.name,
      modifierName: skill.attributeModifier,
      points: 0,
      modifier: currAttr[skill.attributeModifier].modifier
    }
  });

  const [currSkillPoints, setSkillPoints] = useState(skillPoints);

  const checkPointIsValid = (skill, change) => {
    let currPoint = skill.points;
    if((currPoint + change) > (currAttr.power + currAttr.modifier)) {
      const e = new Error("Could not larger than the points you have");
      throw e;
    }

    return true;
  }

  const changePoint = (name, change) => {
    const skill = skillPoints.find(point => point.name === name);

    if(checkPointIsValid(skill, change)){
      setSkillPoints(prev => {
        return {...prev, points: skill.points + change}
      });
      handleSkillChange(currSkillPoints);
    }
  }


  return (
    <div className='classes-container'>
      <h2>Skills</h2>
      <ul>
        {currSkillPoints.map(({name, points, modifierName, modifier}) => (
          <li>
            {name}: {points}
            (Modifier: {modifierName}): {modifier}
            <button onClick={() => changePoint(name, 1)}>+</button>
            <button onClick={() => changePoint(name, -1)}>-</button>
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export default SkillsComp;
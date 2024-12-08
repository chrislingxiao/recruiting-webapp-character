import { useState } from "react";
import { SKILL_LIST } from "../consts";

const SkillCheck = ({currSkill, skillCheck}) => {
  const [roll, setRoll] = useState(0);
  const [dc, setDc] = useState(0);

  const handleRoll = () => {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    setRoll(randomNum);
    const result = {
      point: currSkill.points + roll,
      skill: currSkill.name,
      roll: roll,
      dc: dc,
      results: currSkill.points + roll > dc ? 'SUCCESS': 'FAILED',
    };

    skillCheck(result);
  }

  const changeDc = (e) => {
    const val = e.target.value;
    setDc(val);
  }

  return (
    <div className="skillCheck-container">
      Skill:
      <select>
        {SKILL_LIST.map(({name}) => (
          <option value={name}>{name}</option>
        ))}
      </select>
      DC:
      <input type="number" value={dc} onChange={(e) => changeDc(e)} />
      <button onClick={handleRoll}></button>

   </div>


  )
}

export default SkillCheck;
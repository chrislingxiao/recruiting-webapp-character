import { useState } from "react"

import AttributesComp from "../Attributes";
import ClassesComp from "../Classes";
import SkillsComp from "../Skills";
import SkillCheck from "../SkillCheck";

import "./Character.css";

const Character = ({id, showSkillCheck}) => {
  const [currAttr, setAttr] = useState();
  const [currSkill, setSkill] = useState();

  const skillCheck = ({result}) => {
    showSkillCheck({
      charId: id,
      result
    });
  }

  const handleAttrChange = (updatedAttr) => {
    setAttr(() => updatedAttr);
  }
  const handleSkillChange = (updatedSkillPoints) => {
    setSkill(() => updatedSkillPoints);
  }

  return (
    <div className="char-info">
      <h2>Character {id}</h2>
      <SkillCheck currSkill={currSkill} skillCheck={skillCheck}/>
      <div className="character-container">
        <AttributesComp handleAttrChange={handleAttrChange}/>
        <ClassesComp currAttr={currAttr}/>
        <SkillsComp currAttr={currAttr}  handleSkillChange={handleSkillChange}/>
      </div>
    </div>
  )
}

export default Character;
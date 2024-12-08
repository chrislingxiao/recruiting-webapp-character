import { useEffect, useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import Character from './components/Character/Character';
import { fetchCharacters } from './services/characters.service';

/* Please read my plan */
// I could like use redux to handle the state management across so many components If I get enough time to complete this.
// I personally don't like using props to handle component communication.
//
// The store looks like:
// const store = {
//   chars: [
//     {id, name},
//     ...
//   ],  
//   classes: {
//     byCharId: {
//       "1": {
//         ...
//       }
//     }
//   },
//   attributes: {
//     byCharId: {
//       "1": {
//         ...
//       }
//     }
//   }
//   skills: {
//     byCharId: {
//       "1": {
//         ...
//       }
//     }
//   },
//   skillCheckResult: {
//     id: "",
//     point: "",
//     roll: "",
//     dc: "",
//     result: "",
//   }
// }
// 
// the Actions we're gonna use:
// const fetchChars = () {
//   ...make api request
// }
// const fetchCharClassesById = (id) {
//   ...make api request return get all relate attributes, classes, skills
// }
// const updateCharClasses = (id) {
//   ...pass data to reducer to update store
// }
// const checkSkill = () {
//   ...pass data to reducer to update store to show skill Result
// }
// const addCharacter = () {
//   ...update store to have new character added and make api request to add new char
// }
// const resetCharacter = (id) {
//   ...reset selected character store and make api request
// }


function App() {
  const [num, setNum] = useState<number>(0);
  const [skillCheck, setSkillCheck] = useState(null);
  const [chars, setChars] = useState([]);

  useEffect(() => {
    fetchCharacters().then((data) => setChars(data));
  });

  const showSkillCheck = ({charId, result}) => {
    setSkillCheck({
      charId,
      result,
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {/* <div>
          Value:
          {num}
          <button>+</button>
          <button>-</button>
        </div> */}
        {
          skillCheck && (
            <div className='result'>
            <h2>Skill Check Results</h2>
            <div className='character-name'>
              <h3>{skillCheck.id}</h3>
            </div>
            <div className='character-results'>
              <ul>
                <li>Skill: {skillCheck.skill}: {skillCheck.point}</li>
                <li>You Rolled: {skillCheck.roll}</li>
                <li>The DC was: {skillCheck.dc}</li>
                <li>Result: {skillCheck.results}</li>
              </ul>
            </div>
          </div>
          )
        }
        {chars.map(char => (
          <Character id={char.id} showSkillCheck={showSkillCheck}/>
        ))}
      </section>
    </div>
  );
}

export default App;

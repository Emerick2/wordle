import {useEffect, useState} from 'react';
import Grid from "./components/Grid";
import './App.css'
import KeyboardEvent from "./components/Keyboard";
import type { AttemptProps, LetterProps } from "./components/Grid";

let RandomInt = (min : number, max : number) => {
    if (max < min) {
        return min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [attempts, setAttempts] = useState<AttemptProps[]>([
      {
        status: "pending" as const,
        letters: [
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
        ],
      },
      {
        status: "pending" as const,
        letters: [
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
        ],
      },
      {
        status: "pending" as const,
        letters: [
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
        ],
      },
      {
        status: "pending" as const,
        letters: [
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
        ],
      },
      {
        status: "pending" as const,
        letters: [
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
        ],
      },
      {
        status: "pending" as const,
        letters: [
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
          { letter: "", status: "empty" as const },
        ],
      },
  ]);
  
  const [keyboardActivated, setKeyboardActivated] = useState<boolean>(true);

  const [word, setWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [lineId, setLineId] = useState<number>(0);
  const [characterId, setCharacterId] = useState<number>(0);

  const [victory, setVictory] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const touche1 : string[] = ["a","z","e","r","t","y","u","i","o","p"];
  const touche2 : string[] = ["q","s","d","f","g","h","j","k","l","m"];
  const touche3 : string[] = ["w","x","c","v","b","n"];

  const allKeys : string[] = [...touche1, ...touche2, ...touche3];

  const keyDownAction = (newCharacter : string, newDeleteButton : boolean, newEnterButton : boolean) => {
    if (victory || gameOver) return;

    if ((characterId < 5 || newDeleteButton) && !newEnterButton){
      
      setAttempts(KeyboardEvent({ character: newCharacter, deleteButton: newDeleteButton, enterButton: newEnterButton, attempts:attempts, ligneId : lineId, characterId : characterId }));
      if (newDeleteButton){
    		if (characterId>0){
          setCharacterId(characterId - 1);
        }
      } else {      
        setCharacterId(characterId + 1);
      }
    } if (newEnterButton && characterId >= 5 && lineId < 6) {
      verificationMot(lineId)
      setLineId(lineId + 1);
      setCharacterId(0);
    }
  }

  useEffect(() => {
    const keyDown = (event : globalThis.KeyboardEvent) => {
      if (!keyboardActivated) return;

      const key = event.key.toLowerCase();

      if (key === 'enter') {
        keyDownAction("", false, true);
      }
      else if (key === 'backspace') {
        keyDownAction("", true, false);
      }
      else if (allKeys.includes(key)) {
        keyDownAction(key, false, false);
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [keyboardActivated, characterId, lineId, attempts]);


    // version 1 de l'API :
    // useEffect(() => {
    //   const callAPIWordle = async () => {
    //     try {
    //       const response = await fetch ( 'https://raw.githubusercontent.com/arbxz/wordle-api/main/src/data/words-fr.json');
          
    //       if (!response.ok){
    //         throw new Error(`Erreur l'or de l'appel de l'API : ${response.status}`);
    //       }
          
    //       const data = await response.json();
          
    //       let word = "azerty";

    //       if (data != null && data.words != null){
    //         word = data.words[RandomInt(0, data.words.length)];
    //       }

    //       setLoading(false);
    //       setWord(word);
    //       console.log(word);
    //     } catch (erreur) {
    //       console.error(`Erreur l'or de l'appel de l'API : ${erreur}`);
    //       setLoading(false);
    //       setWord("azerty");
    //     }
    //   };

    //   callAPIWordle();
    // }, []);


  // version 2 de l'API :
  useEffect(() => {
    fetch("http://localhost:3000/api/word?lang=fr", {
      headers: {
        "x-api-key": "Abc123",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWord(data.word);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const verificationMot = (lineIdentifier: number) => {
    if (lineIdentifier >= attempts.length) return;

    // const wordSearch = word;
    let wordSearch = "azert";
    wordSearch = wordSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    let numberOfCorrectAnswers = 0;

    setAttempts((prevAttempts) => {
      const newAttempts = [...prevAttempts];
      const currentLine = newAttempts[lineIdentifier];

      const letterPossible = wordSearch.split("");

      const updatedLetters = currentLine.letters.map((item) => ({
        ...item,
        status: "absent" as LetterProps["status"],
      }));

      updatedLetters.forEach((item, i) => {
        if (item.letter === wordSearch[i]) {
          item.status = "correct";
          numberOfCorrectAnswers+=1;
          const indexInPossible = letterPossible.indexOf(item.letter);
          if (indexInPossible !== -1) {
            letterPossible.splice(indexInPossible, 1);
          }
        }
      });

      updatedLetters.forEach((item) => {
        if (item.status !== "correct") {
          const indexInPossible = letterPossible.indexOf(item.letter);
          if (indexInPossible !== -1) {
            item.status = "misplaced";
            letterPossible.splice(indexInPossible, 1);
          }
        }
      });

      newAttempts[lineIdentifier] = {
        ...currentLine,
        status: "empty",
        letters: updatedLetters,
      };

      if (numberOfCorrectAnswers >= 4) {
        setVictory(true);
      } else if (lineIdentifier >= 5) {
        setGameOver(true);
      }

      return newAttempts;
    });
  };

  return (
    <>    
      <main>
        {loading == true ? <p>Chargement en cours...</p> : null}
        {victory == true ? <h2>Vous avez gagner !</h2> : null}
        {gameOver == true ? <h2>Vous avez perdu...</h2> : null}

        <Grid attempts={attempts} />
        {/* {keyboardActivated==true ? <section className="keyboard"> */}
          
        <section className="keyboard">
          {touche1.map((e, index) => (
            <article key={1000+index} className='keyboardKey'  onClick={(k) => { keyDownAction(e, false, false); }}>
              <span>{e}</span>
            </article>
          ))}
        </section>
        <section className="keyboard">
          {touche2.map((e, index) => (
            <article key={1000+touche1.length+index} className='keyboardKey'  onClick={(k) => { keyDownAction(e, false, false); }}>
              <span>{e}</span>
            </article>
          ))}
        </section>
        <section className="keyboard">
          <article className='keyboardKey keyboardKeySuper'  onClick={(k) => { keyDownAction("", false, true); }}>
            <span>⏎</span>
          </article>
          {touche3.map((e, index) => (
            <article key={1000+touche1.length+touche2.length+index} className='keyboardKey'  onClick={(k) => { keyDownAction(e, false, false); }}>
              <span>{e}</span>
            </article>
          ))}
          <article className='keyboardKey keyboardKeySuper' onClick={(k) => { keyDownAction("", true, false); }}>
            <span>⌫</span>
          </article>
        </section>

        {/* </section> : null} */}
      </main>
    </>
  )
}

export default App
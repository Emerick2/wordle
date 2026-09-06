import {useEffect, useState} from 'react';
import Grid from "./components/Grid";
import './App.css'
import KeyboardEvent from "./Keyboard";

let RandomInt = (min : number, max : number) => {
    if (max < min) {
        return min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [keyboardActivated, setKeyboardActivated] = useState<boolean>(true);

  const [word, setWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const touche1 : string[] = ["a","z","e","r","t","y","u","i","o","p"];
  const touche2 : string[] = ["q","s","d","f","g","h","j","k","l","m"];
  const touche3 : string[] = ["w","x","c","v","b","n"];

  const allKeys : string[] = [...touche1, ...touche2, ...touche3];

  useEffect(() => {
    const keyDown = (event : globalThis.KeyboardEvent) => {
      if (!keyboardActivated) return;

      const key = event.key.toLowerCase();

      if (key === 'enter') {
        KeyboardEvent({ character: "", deleteButton: false, enterButton: true });
      }
      else if (key === 'backspace') {
        KeyboardEvent({ character: "", deleteButton: true, enterButton: false });
      }
      else if (allKeys.includes(key)) {
        KeyboardEvent({ character: key, deleteButton: false, enterButton: false });
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [keyboardActivated]);


    useEffect(() => {
      const callAPIWordle = async () => {
        try {
          const response = await fetch ( 'https://raw.githubusercontent.com/arbxz/wordle-api/main/src/data/words-fr.json');
          
          if (!response.ok){
            throw new Error(`Erreur l'or de l'appel de l'API : ${response.status}`);
          }
          
          const data = await response.json();
          
          let word = "azerty";

          if (data != null && data.words != null){
            word = data.words[RandomInt(0, data.words.length)];
          }

          setLoading(false);
          setWord(word);
          console.log(word);
        } catch (erreur) {
          console.error(`Erreur l'or de l'appel de l'API : ${erreur}`);
          setLoading(false);
          setWord("azerty");
        }
      };

      callAPIWordle();
    }, []);
  

  return (
    <>    
      {loading ? <main>
        <Grid />
        {/* {keyboardActivated==true ? <section className="keyboard"> */}
          
        <section className="keyboard">
          {touche1.map((e, index) => (
            <>
              <article key={index} className='keyboardKey'  onClick={(k) => { KeyboardEvent({character:e, deleteButton:false, enterButton:false}); }}>
                {e}
              </article>
            </>
          ))}
        </section>
        <section className="keyboard">
          {touche2.map((e, index) => (
            <>
              <article key={touche1.length+index} className='keyboardKey'  onClick={(k) => { KeyboardEvent({character:e, deleteButton:false, enterButton:false}); }}>
                {e}
              </article>
            </>
          ))}
        </section>
        <section className="keyboard">
          <article className='keyboardKey keyboardKeySuper'  onClick={(k) => { KeyboardEvent({character:"", deleteButton:false, enterButton:true}); }}>
            ⏎
          </article>
          {touche3.map((e, index) => (
            <>
              <article key={touche1.length+touche2.length+index} className='keyboardKey'  onClick={(k) => { KeyboardEvent({character:e, deleteButton:false, enterButton:false}); }}>
                {e}
              </article>
            </>
          ))}
          <article className='keyboardKey keyboardKeySuper' onClick={(k) => { KeyboardEvent({character:"", deleteButton:true, enterButton:false}); }}>
            ⌫
          </article>
        </section>

        {/* </section> : null} */}
      </main> : null}
    </>
  )
}

export default App
import {useEffect, useState} from 'react';
import './App.css'
import KeyboardEvent from "./Keyboard";

function App() {
  const [keyboardActivated, setKeyboardActivated] = useState<boolean>(true);

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

  return (
    <>    
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
            <article key={index} className='keyboardKey'  onClick={(k) => { KeyboardEvent({character:e, deleteButton:false, enterButton:false}); }}>
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
            <article key={index} className='keyboardKey'  onClick={(k) => { KeyboardEvent({character:e, deleteButton:false, enterButton:false}); }}>
              {e}
            </article>
          </>
        ))}
        <article className='keyboardKey keyboardKeySuper' onClick={(k) => { KeyboardEvent({character:"", deleteButton:true, enterButton:false}); }}>
          ⌫
        </article>
      </section>

      {/* </section> : null} */}
    </>
  )
}

export default App

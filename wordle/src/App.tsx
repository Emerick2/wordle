import {useState} from 'react';
import './App.css'
import KeyboardEvent from "./Keyboard";

function App() {
  const [keyboardActivated, setKeyboardActivated] = useState<boolean>(true);

  const touche1 : string[] = ["a","z","e","r","t","y","u","i","o","p"]
  const touche2 : string[] = ["q","s","d","f","g","h","j","k","l","m"]
  const touche3 : string[] = ["w","x","c","v","b","n"]

  return (
    <>    
      {/* {keyboardActivated==true ? <section className="keyboard"> */}
        
      <section className="keyboard">
        {touche1.map((e) => (
          <>
            <article className='keyboardKey'  onClick={(k) => { KeyboardEvent({character:e, deleteButton:false, enterButton:false}); }}>
              {e}
            </article>
          </>
        ))}
      </section>
      <section className="keyboard">
        {touche2.map((e) => (
          <>
            <article className='keyboardKey'  onClick={(k) => { KeyboardEvent({character:e, deleteButton:false, enterButton:false}); }}>
              {e}
            </article>
          </>
        ))}
      </section>
      <section className="keyboard">
        <article className='keyboardKey keyboardKeySuper'  onClick={(k) => { KeyboardEvent({character:"", deleteButton:false, enterButton:true}); }}>
          ⏎
        </article>
        {touche3.map((e) => (
          <>
            <article className='keyboardKey'  onClick={(k) => { KeyboardEvent({character:e, deleteButton:false, enterButton:false}); }}>
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

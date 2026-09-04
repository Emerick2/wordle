import {useState} from 'react';
import './App.css'
import KeyboardEvent from "./Keyboard";

function App() {
  const [keyboardActivated, setKeyboardActivated] = useState<boolean>(true);

  return (
    <>    
      {keyboardActivated==true ? <section className="keyboard">

        <article className='keyboardKey'  onClick={(e) => { KeyboardEvent({character:"A", deleteButton:false, enterButton:false}); }}>
          A
        </article>

      </section> : null}
    </>
  )
}

export default App

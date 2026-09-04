import './App.css'
import KeyboardEvent from "./Keyboard";

function App() {

  return (
    <>    
      <article className='keyboardKey'  onClick={(e) => {
        KeyboardEvent({character:"A", deleteButton:false, enterButton:false});
      }}>
        A
      </article>
    </>
  )
}

export default App

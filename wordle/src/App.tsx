import { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import type { CaseProps } from "./components/Case";
import type { AttemptProps } from "./components/Grid";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const FALLBACK_WORDS = ["salon", "chien", "train", "porte", "pomme", "fleur", "ombre", "livre"];
export let letterNotValidExport : string[] = []

const createEmptyAttempt = (): AttemptProps => ({
  status: "pending",
  letters: Array.from({ length: WORD_LENGTH }, () => ({
    letter: "",
    status: "empty",
    notPossibleLetter: false
  })),
});

const createEmptyAttempts = () =>
  Array.from({ length: MAX_ATTEMPTS }, () => createEmptyAttempt());

const normalizeWord = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const evaluateGuess = (guess: string[], target: string): CaseProps[] => {
  const remaining = [...target.split("")];
  const letters: CaseProps[] = guess.map((letter) => ({
    letter,
    status: "absent",
    notPossibleLetter: false
  }));

  letters.forEach((item, index) => {
    if (item.letter === target[index]) {
      item.status = "correct";
      const position = remaining.indexOf(item.letter);
      if (position !== -1) remaining.splice(position, 1);
    }
  });

  letters.forEach((item) => {
    if (item.status === "correct") return;

    const position = remaining.indexOf(item.letter);
    if (position !== -1) {
      item.status = "misplaced";
      remaining.splice(position, 1);
    }
  });

  return letters;
};

function App() {
  const [attempts, setAttempts] = useState<AttemptProps[]>(() => createEmptyAttempts());
  const [word, setWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [lineId, setLineId] = useState<number>(0);
  const [characterId, setCharacterId] = useState<number>(0);
  const [victory, setVictory] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [rulesOpen, setRulesOpen] = useState<boolean>(true);
  const [endGameOpen, setEndGameOpen] = useState<boolean>(false);
  const [letterNotValid, setLetterNotValid] = useState<string[]>([]);

  letterNotValidExport = [...letterNotValid]

  const allKeys = [
    "a", "z", "e", "r", "t", "y", "u", "i", "o", "p",
    "q", "s", "d", "f", "g", "h", "j", "k", "l", "m",
    "w", "x", "c", "v", "b", "n",
  ];

  useEffect(() => {
    const fallbackWord = FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)];

    fetch("http://localhost:3000/api/word?lang=fr", {
      headers: {
        "x-api-key": "Abc123",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const safeWord = typeof data.word === "string" ? normalizeWord(data.word) : "";

        if (safeWord.length !== WORD_LENGTH || !/^[a-z]+$/.test(safeWord)) {
          console.error("Mot API invalide reçu :", data.word);
          setWord(fallbackWord);
          setLoading(false);
          return;
        }

        setWord(safeWord);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setWord(fallbackWord);
        setLoading(false);
      });
  }, []);

  const clearLetter = () => {
    if (characterId === 0 || victory || gameOver) return;

    setAttempts((previousAttempts) => {
      const nextAttempts = [...previousAttempts];
      const currentLine = [...nextAttempts[lineId].letters];
      currentLine[characterId - 1] = { letter: "", status: "empty"};
      nextAttempts[lineId] = { ...nextAttempts[lineId], letters: currentLine };
      return nextAttempts;
    });

    setCharacterId((previous) => Math.max(previous - 1, 0));
  };

  const addLetter = (newCharacter: string) => {
    if (characterId >= WORD_LENGTH || victory || gameOver) return;

    const normalizedCharacter = newCharacter.toLowerCase();
    if (!normalizedCharacter || !allKeys.includes(normalizedCharacter)) return;

    setAttempts((previousAttempts) => {
      const nextAttempts = [...previousAttempts];
      const currentLine = [...nextAttempts[lineId].letters];
      currentLine[characterId] = { letter: normalizedCharacter, status: "pending" };
      nextAttempts[lineId] = { ...nextAttempts[lineId], letters: currentLine };
      return nextAttempts;
    });

    setCharacterId((previous) => previous + 1);
  };

  const submitGuess = () => {
    if (loading || characterId < WORD_LENGTH || victory || gameOver || !word) return;

    const currentLine = attempts[lineId];
    if (!currentLine) return;

    const guess = currentLine.letters.map((item) => item.letter);
    const target = normalizeWord(word);
    const nextLetters = evaluateGuess(guess, target);
    const isVictory = nextLetters.every((item) => item.status === "correct");

    
    
    setAttempts((previousAttempts) => {
      const nextAttempts = [...previousAttempts];
      nextAttempts[lineId] = {
        ...nextAttempts[lineId],
        letters: nextLetters,
      };
      return nextAttempts;
    });
    
    if (isVictory) {
      setVictory(true);
      return;
    }
    
    if (lineId >= MAX_ATTEMPTS - 1) {
      setGameOver(true);
      return;
    }
    
    setLineId((previous) => previous + 1);
    setCharacterId(0);


    const newTable : string[] = [];
    nextLetters.forEach((item) => {
      if (item.status === "absent" && word.includes(item.letter) == false) {
        newTable.push(item.letter)
      }
    });
    setLetterNotValid([...letterNotValid, ...newTable]);
  };
  
  const keyDownAction = (newCharacter: string, newDeleteButton: boolean, newEnterButton: boolean) => {
    if (newEnterButton) {
      submitGuess();
      return;
    }

    if (newDeleteButton) {
      clearLetter();
      return;
    }

    if (letterNotValid.includes(newCharacter) == false){
      addLetter(newCharacter);
    }
  };

  const handleKeyboardInput = (value: string | "ENTER" | "BACKSPACE") => {
    if (value === "ENTER") {
      keyDownAction("", false, true);
      return;
    }

    if (value === "BACKSPACE") {
      keyDownAction("", true, false);
      return;
    }

    if (allKeys.includes(value)) {
      keyDownAction(value, false, false);
    }
  };

  useEffect(() => {
    const keyDown = (event: globalThis.KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === "enter") {
        keyDownAction("", false, true);
      } else if (key === "backspace") {
        keyDownAction("", true, false);
      } else if (allKeys.includes(key)) {
        keyDownAction(key, false, false);
      }
    };

    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, [allKeys, attempts, characterId, gameOver, lineId, loading, victory, word]);

  useEffect(() => {
    if (victory || gameOver) {
      setEndGameOpen(true);
    }
  }, [victory, gameOver]);

  return (
    <>
      <button className="rulesButton" onClick={() => setRulesOpen(true)}>
        Règles
      </button>

      {rulesOpen && (
        <Modal onClose={() => setRulesOpen(false)}>
          <h2>Règles du Wordle</h2>
          <p>Vous devez trouver le mot en 6 tentatives.</p>
          <p>Chaque tentative contient 5 lettres.</p>
          <p>Une case verte signifie que la lettre est bien placée.</p>
          <p>Une case jaune signifie que la lettre est présente mais mal placée.</p>
          <p>Une case grise signifie que la lettre n'est pas dans le mot.</p>
          <button onClick={() => setRulesOpen(false)}>Jouer</button>
        </Modal>
      )}

      <main>
        {loading ? <p>Chargement en cours...</p> : null}
        {victory ? <h2>Vous avez gagné !</h2> : null}
        {gameOver ? <h2>Vous avez perdu...</h2> : null}

        <Grid attempts={attempts} />

        <Keyboard onKeyPress={handleKeyboardInput} disabled={loading || victory || gameOver} />
      </main>

      {endGameOpen && (
        <Modal onClose={() => setEndGameOpen(false)}>
          {victory ? (
            <>
              <h2>Vous avez gagné !</h2>
              <p>Bravo ! Vous avez trouvé le mot.</p>
            </>
          ) : (
            <>
              <h2>Vous avez perdu...</h2>
              <p>Vous n'avez pas trouvé le mot.</p>
            </>
          )}

          <p>Le mot recherché était :</p>
          <strong>{word}</strong>
          <button onClick={() => setEndGameOpen(false)}>Fermer</button>
        </Modal>
      )}
    </>
  );
}

export default App;

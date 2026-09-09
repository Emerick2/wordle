const KEY_ROWS = {
  first: ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  second: ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  third: ["w", "x", "c", "v", "b", "n"],
} as const;

export type KeyboardInput = string | "ENTER" | "BACKSPACE";

export interface KeyboardProps {
  onKeyPress: (value: KeyboardInput) => void;
  disabled?: boolean;
}

export default function Keyboard({ onKeyPress, disabled = false }: KeyboardProps) {
  const handlePress = (value: KeyboardInput) => {
    if (!disabled) {
      onKeyPress(value);
    }
  };

  return (
    <>
      <section className="keyboard">
        {KEY_ROWS.first.map((letter, index) => (
          <article
            key={1000 + index}
            className="keyboardKey"
            onClick={() => handlePress(letter)}
          >
            <span>{letter}</span>
          </article>
        ))}
      </section>

      <section className="keyboard">
        {KEY_ROWS.second.map((letter, index) => (
          <article
            key={2000 + index}
            className="keyboardKey"
            onClick={() => handlePress(letter)}
          >
            <span>{letter}</span>
          </article>
        ))}
      </section>

      <section className="keyboard">
        <article
          className="keyboardKey keyboardKeySuper"
          onClick={() => handlePress("ENTER")}
        >
          <span>⏎</span>
        </article>

        {KEY_ROWS.third.map((letter, index) => (
          <article
            key={3000 + index}
            className="keyboardKey"
            onClick={() => handlePress(letter)}
          >
            <span>{letter}</span>
          </article>
        ))}

        <article
          className="keyboardKey keyboardKeySuper"
          onClick={() => handlePress("BACKSPACE")}
        >
          <span>⌫</span>
        </article>
      </section>
    </>
  );
}

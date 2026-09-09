import Case from "./Case";
import type { AttemptProps } from "./Grid";

export default function Attempt({ letters, status }: AttemptProps) {
  return (
    <article className={`attempt ${status}`}>
      {letters.map((item, index) => (
        <Case
          key={index}
          letter={item.letter}
          status={item.status}
        />
      ))}
    </article>
  );
}
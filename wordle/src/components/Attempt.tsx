import Case from "./Case";
import type { Status } from "./Case";

type AttemptStatus = "pending" | "validated";

interface AttemptProps {
  letters: {
    letter: string;
    status: Status;
  }[];
  status: AttemptStatus;
}

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
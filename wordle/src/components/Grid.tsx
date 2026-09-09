import Attempt from "./Attempt";
import type { Status } from "./Case";

export interface LetterProps {
  letter: string;
  status: Status;
}

export interface AttemptProps {
  status: "pending" | "empty";
  letters: LetterProps[];
}

interface GridProps {
  attempts: AttemptProps[];
}

export default function Grid({ attempts }: GridProps) {
  return (
    <section className="grid">
      {attempts.map((attempt, index) => (
        <Attempt key={index} letters={attempt.letters} status={attempt.status} />
      ))}
    </section>
  );
}

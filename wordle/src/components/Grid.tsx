import Attempt from "./Attempt";
import type { CaseProps } from "./Case";

export interface AttemptProps {
  status: "pending" | "empty";
  letters: CaseProps[];
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

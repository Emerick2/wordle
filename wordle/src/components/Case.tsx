export type Status =
  | "empty"
  | "pending"
  | "correct"
  | "misplaced"
  | "absent";

export interface CaseProps {
  letter: string;
  status: Status;
}

export default function Case({ letter, status }: CaseProps) {

  return (
    <article className={`case ${status}`}>
      {letter}
    </article>
  );
}
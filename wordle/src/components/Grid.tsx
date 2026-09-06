import Attempt from "./Attempt";
import type { Status } from "./Case";

export interface AttemptProps {
  status: Status;
  letters: LetterProps[];
}

export interface LetterProps{
  letter : string;
  status : Status;
}

interface GridProps {
  attempts : AttemptProps[];
}



export default function Grid({attempts} : GridProps) {
  // const [attempts, setAttempts] = useState<AttemptProps[]>([
  //   {
  //     status: "pending" as const,
  //     letters: [
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //     ],
  //   },
  //   {
  //     status: "pending" as const,
  //     letters: [
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //     ],
  //   },
  //   {
  //     status: "pending" as const,
  //     letters: [
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //     ],
  //   },
  //   {
  //     status: "pending" as const,
  //     letters: [
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //     ],
  //   },
  //   {
  //     status: "pending" as const,
  //     letters: [
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //     ],
  //   },
  //   {
  //     status: "pending" as const,
  //     letters: [
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //       { letter: "", status: "empty" as const },
  //     ],
  //   },
  // ]);

  return (
    <section className="grid">
      {attempts.map((attempt, index) => (
        <Attempt
          key={index}
          letters={attempt.letters}
          status={attempt.status}
        />
      ))}
    </section>
  );
}

export function SetLetter(character : string, attempts : AttemptProps[], ligneId : number, characterId : number) : AttemptProps[]{
  console.log("character : "+characterId);
  console.log("ligne : "+ligneId);
  let newAttemps : AttemptProps[] = [];
  for (let i = 0; i < attempts.length; i++) {
    if (ligneId == i){
      let valeurAttemps : AttemptProps = {
        ...attempts[i],
        letters: attempts[i].letters.map((k, index) => {
          if (index === characterId) {
            return { ...k, letter: character };
          }
          return { ...k };
        })
      };

      newAttemps.push(valeurAttemps);
    } else {
      newAttemps.push(attempts[i]);
    }
  }

  return newAttemps;
}


import Attempt from "./Attempt";

export default function Grid() {
  const attempts = [
    {
      status: "pending" as const,
      letters: [
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
      ],
    },
    {
      status: "pending" as const,
      letters: [
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
      ],
    },
    {
      status: "pending" as const,
      letters: [
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
      ],
    },
    {
      status: "pending" as const,
      letters: [
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
      ],
    },
    {
      status: "pending" as const,
      letters: [
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
      ],
    },
    {
      status: "pending" as const,
      letters: [
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
        { letter: "", status: "empty" as const },
      ],
    },
  ];

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
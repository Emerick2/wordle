import { useEffect, useState } from "react";
import Attempt from "./Attempt";

export default function Grid() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetch("http://localhost:3000/api/word?lang=fr", {
      headers: {
        "x-api-key": "Abc123",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWord(data.word);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement du mot...</p>
      </div>
    );
  }

  console.log(word);

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
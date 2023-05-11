import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { words } from "../../wordList";
import { Keyboard } from "../keyboard/keyboard";

const ToggleInstructions = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  font-size: 20px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  width: 200px;
`;

const Instructions = styled.div`
  background: none;
  color: white;
  font-size: 18px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  max-width: 310px;
`;

const Timer = styled.span`
  color: rgb(221 109 255);
`;

const updateWord = (letters, gameWords) => {
  const matches = gameWords.filter((word) => {
    let isMatch = true;
    letters?.forEach((letter, index) => {
      if (word[index] !== letter) {
        isMatch = false;
      }
    });
    return isMatch;
  });

  const newWord = matches[Math.floor(Math.random() * matches?.length)];
  const newLetter = newWord && newWord[letters.length];
  return { newWord, newLetter };
};

export const Home = () => {
  const [letters, setLetters] = useState([]);
  const [gameOver, setGameOver] = useState(true);
  const [gameCount, setGameCount] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const gameWords = words.filter((word) => {
    return word.length === 6;
  });
  const handleClick = (e) => {
    setGameCount(gameCount + 1);
    const ltr = e.target.value.toLowerCase();
    const { newWord, newLetter } = updateWord([...letters, ltr], gameWords);
    if (!newWord) {
      setScore(score - 1);
      const { newLetter } = updateWord([], gameWords);
      setLetters(newLetter);
      return;
    } else {
      if (letters.length === 5) {
        setLetters([...letters, ltr]);
      } else {
        setLetters([...letters, ltr, newLetter]);
      }
    }
  };

  const handlePlay = () => {
    setGameOver(false);
    setMessage("");
    const { newLetter } = updateWord([], gameWords);
    setLetters([newLetter]);
    setTime(180);
    setScore(0);
  };

  useEffect(() => {
    if (letters.length === 6) {
      setScore(score + 1);
      const { newLetter } = updateWord([], gameWords);
      setLetters(newLetter);
    }
  });

  useEffect(() => {
    if (!gameOver) {
      const { newLetter } = updateWord(letters, gameWords);
      setLetters([newLetter]);
    }
  }, [gameOver]);

  const [time, setTime] = useState(60);

  useEffect(() => {
    if (!gameOver) {
      time > 0 &&
        setTimeout(() => {
          setTime(time - 1);
        }, 1000);
    }

    if (time === 0) {
      setGameOver(true);
      setMessage("GAME OVER!!!");
    }
  }, [gameOver, time]);

  const [showInstructions, setShowInstructions] = useState(false);
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="game-container">
      <div className="time-label">
        TIME REMAINING: <Timer className="time">{time}</Timer>
      </div>
      <div className="score-label">
        SCORE: <span className="score">{score}</span>
      </div>
      <div className="tile-container">
        <div className="tile">{letters[0]}</div>
        <div className="tile">{letters[1]}</div>
        <div className="tile">{letters[2]}</div>
        <div className="tile">{letters[3]}</div>
        <div className="tile">{letters[4]}</div>
        <div className="tile">{letters[5]}</div>
      </div>
      <div className="message">{message}</div>
      <Keyboard gameOver={gameOver} handleClick={handleClick} />
      <button disabled={!gameOver} className="play-btn" onClick={handlePlay}>
        PLAY
      </button>
      <ToggleInstructions onClick={toggleInstructions}>
        {showInstructions ? "Hide" : ""} Instructions
      </ToggleInstructions>
      {showInstructions && (
        <>
          <Instructions>
            Your goal is to form as many 6-letter words as possible in 3 minutes
          </Instructions>
          <Instructions>
            You and the computer alternate playing a letter
          </Instructions>
          <Instructions>Score 1 point for every completed word</Instructions>
          <Instructions>
            Lose 1 point for every letter you play that doesn't conform to a
            word in our list
          </Instructions>
          <Instructions>
            Keep it straightforward and pick words in their commonly used forms
            - don't try plurals or modified tenses. We don't have many of those
            in our list.
          </Instructions>
          <Instructions>Good luck!</Instructions>
        </>
      )}
    </div>
  );
};

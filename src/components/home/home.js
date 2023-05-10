import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { words } from "../../wordList";
import { Keyboard } from "../keyboard/keyboard";

const Instructions = styled.div`
  background: none;
  border: 1px solid white;
  color: white;
  font-size: 18px;
  padding: 20px;
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
      <Instructions>
        <div>
          <strong>Instructions: </strong>
        </div>
        Think of a 6 letter word that can be made from letters on the screen and
        play the next letter. The computer goes first and you'll alternate
        turns. But be careful, the computer might be thinking of a different
        word than you 😏. 1 point for every word you finish, -1 point if you
        play a letter that doesn't conform to a 6-letter word.
      </Instructions>
    </div>
  );
};

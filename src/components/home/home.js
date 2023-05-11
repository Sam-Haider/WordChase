/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { words } from "../../wordList";
import { Keyboard } from "../keyboard/keyboard";

const Title = styled.div`
  margin-top: 10px;
  font-size: 40px;
  color: white;
`;

const ToggleInstructions = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  font-size: 20px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  width: 200px;
  box-sizing: border-box;
`;

const PlayButton = styled.div`
  border: 1px solid rgb(11, 110, 175);
  font-size: 30px;
  color: white;
  width: 275px;
  margin-top: 20px;
  border-radius: 5px;
  padding: 10px;
  background-image: linear-gradient(to right, #1c3649, #3d4461, #730a8e);
  text-align: center;
  box-sizing: border-box;
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

const Tile = styled.div`
  ${({ isCorrectWord }) =>
    isCorrectWord && `background-color: #83f79f; color: black`}
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

  const [isCorrectWord, setIsCorrectWOrd] = useState(false);

  useEffect(() => {
    if (letters.length === 6 && letters[5] !== "") {
      setIsCorrectWOrd(true);
      setTimeout(() => {
        setScore((prevScore) => prevScore + 1);
        const { newLetter } = updateWord([], gameWords);
        setLetters(newLetter);
        setIsCorrectWOrd(false);
      }, 2000);
    }
  }, [letters]);

  useEffect(() => {
    if (!gameOver) {
      const { newLetter } = updateWord(letters, gameWords);
      setLetters([newLetter]);
    }
  }, [gameOver]);

  const [time, setTime] = useState(180);

  useEffect(() => {
    let timerId;
    if (!gameOver) {
      time > 0 &&
        (timerId = setTimeout(() => {
          setTime(time - 1);
        }, 1000));
    }

    if (time === 0) {
      setGameOver(true);
      setMessage("GAME OVER!!!");
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [gameOver, time]);

  const [showInstructions, setShowInstructions] = useState(false);
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  useEffect(() => {
    if (showInstructions) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [showInstructions]);

  return (
    <div className="game-container">
      <Title>WordChase</Title>
      <div className="time-label">
        TIME REMAINING: <Timer className="time">{time}</Timer>
      </div>
      <div className="score-label">
        SCORE: <span className="score">{score}</span>
      </div>
      <div className="tile-container">
        <Tile isCorrectWord={isCorrectWord} className="tile">
          {letters[0]}
        </Tile>
        <Tile isCorrectWord={isCorrectWord} className="tile">
          {letters[1]}
        </Tile>
        <Tile isCorrectWord={isCorrectWord} className="tile">
          {letters[2]}
        </Tile>
        <Tile isCorrectWord={isCorrectWord} className="tile">
          {letters[3]}
        </Tile>
        <Tile isCorrectWord={isCorrectWord} className="tile">
          {letters[4]}
        </Tile>
        <Tile isCorrectWord={isCorrectWord} className="tile">
          {letters[5]}
        </Tile>
      </div>
      <div className="message">{message}</div>
      <Keyboard gameOver={gameOver} handleClick={handleClick} />
      <PlayButton
        disabled={!gameOver}
        className="play-btn"
        onClick={handlePlay}
      >
        PLAY
      </PlayButton>
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

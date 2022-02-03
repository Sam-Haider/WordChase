import React, { useEffect, useState } from 'react';
import { words } from '../../wordList';
import { Keyboard } from '../keyboard/keyboard';

const updateWord = letters => {
    const matches = words.filter(word => {
        let isMatch = true;
        letters.forEach((letter, index) => {
            if(word[index] !== letter){
                isMatch = false;
            }
        })
        return isMatch;
    })

    const newWord = matches[Math.floor(Math.random() * matches?.length)];
    const newLetter = newWord && newWord[letters.length]
    return {newWord, newLetter};
}

export const Home = () => {

    const [letters, setLetters] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    console.log('game over', gameOver);
    const handleClick = e => {
        const ltr = e.target.value.toLowerCase();
        const {newWord, newLetter} = updateWord([...letters, ltr])
        console.log('new word is', newWord);
        console.log('new letter is', newLetter);
        if(!newWord) {
            setGameOver(true);
            return;
        } else {
            if(letters.length === 6) {
                setLetters([...letters, ltr])
            } else {
                setLetters([...letters, ltr, newLetter])
            }
            
        }
    }

    const handlePlayAgain = () => {
        setGameOver(false);
        setLetters([]);
    }

    useEffect(() => {
        console.log('letters.length is', letters.length)
        if(letters.length === 7) {
            alert('you win');
        }
    })

    useEffect(() => {
        if(gameOver) {
            alert('you lost');
        }
    })

    return (
        <div className='game-container'>
            <div className='tile-container'>
                <div className="tile">{letters[0]}</div>
                <div className="tile">{letters[1]}</div>
                <div className="tile">{letters[2]}</div>
                <div className="tile">{letters[3]}</div>
                <div className="tile">{letters[4]}</div>
                <div className="tile">{letters[5]}</div>
                <div className="tile">{letters[6]}</div>
            </div>
            <Keyboard gameOver={gameOver} handleClick={handleClick}/>
            {gameOver && <button className="game-over-btn" onClick={handlePlayAgain}>Play Again</button>}
        </div>
      );
}
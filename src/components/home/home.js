import React, { useCallback, useEffect, useState, useReducer } from 'react';
import { words } from '../../words';
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
    const newLetter = newWord[letters.length]
    return {newWord, newLetter};
}

export const Home = () => {

    const [letters, setLetters] = useState([]);

    const handleClick = e => {
        const ltr = e.target.value.toLowerCase();
        const {newLetter} = updateWord([...letters, ltr])
        setLetters([...letters, ltr, newLetter])
    }

    if(letters.length === 7) {
        alert('you win');
    }

    return (
        <div>
            <div className='tile-container'>
                <div className="tile">{letters[0]}</div>
                <div className="tile">{letters[1]}</div>
                <div className="tile">{letters[2]}</div>
                <div className="tile">{letters[3]}</div>
                <div className="tile">{letters[4]}</div>
                <div className="tile">{letters[5]}</div>
                <div className="tile">{letters[6]}</div>
            </div>
          <Keyboard handleClick={handleClick}/>
        </div>
      );
}
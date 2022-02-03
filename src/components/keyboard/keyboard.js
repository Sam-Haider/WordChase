import React from 'react';

export const Keyboard = ({handleClick, gameOver}) => {
    console.log('game over is', gameOver)
    return (
        <div className="keyboard-container">
            <div className="keyboard">
                <button disabled={gameOver}value="A" className="key" onClick={handleClick}>A</button>
                <button disabled={gameOver}value="B" className="key" onClick={handleClick}>B</button>
                <button disabled={gameOver}value="C" className="key" onClick={handleClick}>C</button>
                <button disabled={gameOver}value="D" className="key" onClick={handleClick}>D</button>
                <button disabled={gameOver}value="E" className="key" onClick={handleClick}>E</button>
                <button disabled={gameOver}value="F" className="key" onClick={handleClick}>F</button>
                <button disabled={gameOver}value="G" className="key" onClick={handleClick}>G</button>
                <button disabled={gameOver}value="H" className="key" onClick={handleClick}>H</button>
                <button disabled={gameOver}value="I" className="key" onClick={handleClick}>I</button>
                <button disabled={gameOver}value="J" className="key" onClick={handleClick}>J</button>
                <button disabled={gameOver}value="K" className="key" onClick={handleClick}>K</button>
                <button disabled={gameOver}value="L" className="key" onClick={handleClick}>L</button>
                <button disabled={gameOver}value="M" className="key" onClick={handleClick}>M</button>
                <button disabled={gameOver}value="N" className="key" onClick={handleClick}>N</button>
                <button disabled={gameOver}value="O" className="key" onClick={handleClick}>O</button>
                <button disabled={gameOver}value="P" className="key" onClick={handleClick}>P</button>
                <button disabled={gameOver}value="Q" className="key" onClick={handleClick}>Q</button>
                <button disabled={gameOver}value="R" className="key" onClick={handleClick}>R</button>
                <button disabled={gameOver}value="S" className="key" onClick={handleClick}>S</button>
                <button disabled={gameOver}value="T" className="key" onClick={handleClick}>T</button>
                <button disabled={gameOver}value="U" className="key" onClick={handleClick}>U</button>
                <button disabled={gameOver}value="V" className="key" onClick={handleClick}>V</button>
                <button disabled={gameOver}value="W" className="key" onClick={handleClick}>W</button>
                <button disabled={gameOver}value="X" className="key" onClick={handleClick}>X</button>
                <button disabled={gameOver}value="Y" className="key" onClick={handleClick}>Y</button>
                <button disabled={gameOver}value="Z" className="key" onClick={handleClick}>Z</button>
            </div>
        </div>
    )
};
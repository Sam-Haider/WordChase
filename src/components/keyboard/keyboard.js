import React from 'react';

export const Keyboard = ({handleClick}) => {
    return (
        <div className="keyboard-container">
            <div className="keyboard">
                <button value="A" className="key" onClick={handleClick}>A</button>
                <button value="B" className="key" onClick={handleClick}>B</button>
                <button value="C" className="key" onClick={handleClick}>C</button>
                <button value="D" className="key" onClick={handleClick}>D</button>
                <button value="E" className="key" onClick={handleClick}>E</button>
                <button value="F" className="key" onClick={handleClick}>F</button>
                <button value="G" className="key" onClick={handleClick}>G</button>
                <button value="H" className="key" onClick={handleClick}>H</button>
                <button value="I" className="key" onClick={handleClick}>I</button>
                <button value="J" className="key" onClick={handleClick}>J</button>
                <button value="K" className="key" onClick={handleClick}>K</button>
                <button value="L" className="key" onClick={handleClick}>L</button>
                <button value="M" className="key" onClick={handleClick}>M</button>
                <button value="N" className="key" onClick={handleClick}>N</button>
                <button value="O" className="key" onClick={handleClick}>O</button>
                <button value="P" className="key" onClick={handleClick}>P</button>
                <button value="Q" className="key" onClick={handleClick}>Q</button>
                <button value="R" className="key" onClick={handleClick}>R</button>
                <button value="S" className="key" onClick={handleClick}>S</button>
                <button value="T" className="key" onClick={handleClick}>T</button>
                <button value="U" className="key" onClick={handleClick}>U</button>
                <button value="V" className="key" onClick={handleClick}>V</button>
                <button value="W" className="key" onClick={handleClick}>W</button>
                <button value="X" className="key" onClick={handleClick}>X</button>
                <button value="Y" className="key" onClick={handleClick}>Y</button>
                <button value="Z" className="key" onClick={handleClick}>Z</button>
            </div>
        </div>
    )
};
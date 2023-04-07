import React, { useState, useEffect } from "react";
import moves from './moves.txt';


export function Scrambler() {
  const [algorithm, setAlgorithm] = useState();
  const [movesList, setMovesList] = useState();
  const [scrambleNumber, setNumber] = useState(20);

  useEffect( () => {
    fetch(moves)
     .then(response => response.text())
     .then(text => {setMovesList(text.split("\n"));
    }); 
  }, []) 

  
  function Scramble() {
    let algorithmCombine = ''; 
    let lastMove = "";
    for (let i = 0; i < scrambleNumber; i++) {
      var randomMove = movesList[Math.floor(Math.random() * movesList.length)].toString();
      while (randomMove.slice(0,1) == lastMove.slice(0,1)) {
        randomMove = movesList[Math.floor(Math.random() * movesList.length)].toString();
      }
      lastMove = randomMove;
      algorithmCombine += " " + randomMove;
    }

    setAlgorithm(algorithmCombine);
  }
  
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  return (
    <div className = "scrambler-container">
      <button onClick={Scramble}>Scramble</button>
      <input type="number" value={clamp(scrambleNumber, 1, 30)} onInput={e => setNumber(e.target.value)}></input>
      <p>{algorithm}</p>
    </div>
  );
  
 
};

export default Scrambler;
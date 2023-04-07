import React, { useState, useEffect } from "react";

export function checkScore(score) {
  const highScores = JSON.parse(localStorage.getItem('Times')) ?? [];

  saveScore(score, highScores);
  showHighScores();
};

function saveScore(score, highScores) {
  const newIndex = highScores.length + 1;
  const newScore = { score, newIndex };
  
  highScores.unshift(newScore);
  highScores.splice(highScores.length);
  localStorage.setItem('Times', JSON.stringify(highScores));
};

function showHighScores() {
  const highScores = JSON.parse(localStorage.getItem('Times')) ?? [];
  const highScoreList = document.getElementById('Times');
  
  highScoreList.innerHTML = 
    "<tr><th>Run</th><th>Time</th></tr>" +
    highScores.map((score) => 
      `<tr>
        <td>${score.newIndex}</td>
        <td>${score.score}</td>
      </tr>`
    )
    .join('');

  calculateBestTime();
};

function calculateBestTime() {
  const highScores = JSON.parse(localStorage.getItem('Times')) ?? [];
  let timesSeconds = [];
  for (time of highScores) {
    let minutes = 0;
    let newTime = 0;

    //Minutes
    if (time.contains(':')) {
      minutes = time.split(':', 1)[0].slice(0,-1).parseInt() * 60;
      newTime += minutes
      time.replace(minutes.toString() + ":",'')
    }

    //Seconds
    newTime += time.split('.', 1)[0].slice(0,-1).parseInt();    
    time.replace((newTime - minutes).toString() + ".",'')

    //Miliseconds
    newTime += time.parseInt() / 100; 
    
    timesSeconds.push(newTime);
  }

  let minVal = timesSeconds[0]
  for (timeSecond of timesSeconds) {
    if (timeSecond < minVal) {
      minVal = timeSecond;
    }
  }

  return minVal;
}


const TimeBoard = () => {

  const [bestTime, setBestTime] = useState(0);
  
  useEffect(() => {
    showHighScores();
    setBestTime(calculateBestTime());
  }, []);

  useEffect(() => {
    setBestTime(calculateBestTime());
  });

  
  
  return (
    <div class="timeWrapper">
      <h1>{bestTime}</h1>
      <table id = "Times">
      </table>
    </div>
  );
};

export default TimeBoard;

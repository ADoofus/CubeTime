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
  for (let time in highScores) {
    let minutes = 0;
    let newTime = 0;
    let temp;

    //Minutes
    if (time.includes(":")) {
      temp = time.split(':', 1);
      temp = temp[0];
      temp = temp.slice(0,-1);
      temp = temp.parseInt() * 60;
      newTime += temp;
      time.replace(minutes.toString() + ":",'')
    }

    //Seconds
    temp = time.split('.', 1);
    temp = temp[0];
    temp = temp.slice(0,-1);
    temp = temp.parseInt();
    newTime += temp;  
    time.replace((newTime - minutes).toString() + ".",'')

    //Miliseconds
    newTime += time.parseInt() / 100; 
    
    timesSeconds.push(newTime);
  }

  let timeSecond;
  let minVal = timesSeconds[0]
  for (let timeSecond in timesSeconds) {
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

import React, { useState, useEffect } from "react";
import { checkScore } from "./TimeBoard.jsx";
import Scrambler from "./Scrambler.jsx";

const Stopwatch = () => {

  // state to store time
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(2);
  const [color, setColor] = useState({ color: 'white' });

  //scramble2();

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);
  const [timeString, setTimeString] = useState('0.00');
  const [timeoutID, setTimeoutID] = useState(null);

  let minutes, seconds, milliseconds;


  document.onkeydown = function (e) {
    if (e.repeat) { return }
    if (e.keyCode === 32) {
      console.log(start);
      if (start >= 2) {
        setColor({ color: 'red' });
        setTimeoutID(setTimeout(() => {
          setStart(0);
          setTime(0);
          setColor({ color: 'green' });
          setTimeoutID(null);
        }, 300))
      } else if (start <= 1) {
        const newTimeString =
          (minutes > 0 ? minutes.toString() + ":" : "")+
          (minutes > 0 ? seconds.toString().padStart(2, "0") + "." : seconds.toString() + ".") +
          + (milliseconds.toString().padStart(2, "0"));
        setTimeString(newTimeString);
        checkScore(newTimeString);
        //Scrambler.Scramble();
      }
      startAndStop(false);
    }
  }

  document.onkeyup = function (e) {
    if (e.repeat) { return }

    if (e.keyCode === 32) {
      //console.log(start);
      clearTimeout(timeoutID);
      setTimeoutID(null);
      if (start <= 0) {
        startAndStop(true);
      }
      setColor({ color: 'white' });
      setStart(start + 1);
    }
  }

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
      setTimeString(
        (minutes > 0 ? minutes.toString() + ":" : "") +
        (minutes > 0 ? seconds.toString().padStart(2, "0") + "." : seconds.toString() + ".") +
        (milliseconds.toString().padStart(2, "0").slice(0, -1))
      );
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  minutes = Math.floor((time % 360000) / 6000);
  seconds = Math.floor((time % 6000) / 100);
  milliseconds = time % 100;

  const startAndStop = (on) => {
    setIsRunning(on);
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time" style={color}>
        {timeString}
      </p>
      <div className="stopwatch-buttons">
      </div>
{/*       <input type="hidden"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        tabIndex={0} /> */}
    </div>
  );



};

export default Stopwatch;
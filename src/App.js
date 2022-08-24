import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let secondz = 0;
  let minutez = 0;
  let hourz = 0;
  // const [mili, setMili] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [time, setTime] = useState(Math.pow(100, 10));

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((preSecond) => {
        if (preSecond < 59) return preSecond + 1;
        else setSecond(0);
      });
    }, 1000);
    return () => {
      //cleanup func
      clearInterval(timer);
    };
  });

  useEffect(() => {
    if (second >= 59) {
      setMinute((pre) => pre + 1);
    }
  }, [second]);

  useEffect(() => {
    if (minute >= 59) {
      setHour((pre) => pre + 1);
    }
  }, [minute]);
  const handleReset = () => {
    setSecond(0);
    setMinute(0);
    setHour(0);
    setTime(Math.pow(100, 10));
    document.querySelector(".btn-start").style.backgroundColor =
      "rgb(124, 218, 144)";
    document.querySelector(".btn-stop").style.backgroundColor = "#ccc";
  };

  const handleStart = () => {
    
    setTime(1000);
    document.querySelector(".btn-start").style.backgroundColor = "#ccc";
    document.querySelector(".btn-stop").style.backgroundColor =
      "rgb(124, 218, 144)";
  };
  const handleStop = () => {
    setTime(Math.pow(100, 10));
    document.querySelector(".btn-start").style.backgroundColor =
      "rgb(124, 218, 144)";

    document.querySelector(".btn-stop").style.backgroundColor = "#ccc";
  };

  const handleSplit = () => {
    if (second === 0) {
      return
    }
    document.querySelector(".time-split-list").style.display = "flex";
    secondz = second;
    minutez = minute;
    hourz = hour;
    const x = document.createElement("li");
    x.innerHTML = `
    <div className="time-split" style="margin:0px;" >
            <span>${hourz < 10 ? hourz : hourz}</span>:
            <span>${minutez < 10 ? minutez : minutez}</span>:
            <span>${secondz < 10 ? secondz : secondz}</span>
            
          </div>
    `;
    document.querySelector(".time-split-list").appendChild(x);

    
  };

  return (
    <div className="App">
      <h1>Time.is</h1>
      <br />
      <div className="time-clock">
        <h2>
          <span>{hour < 10 ? `0${hour}` : hour}</span>:
          <span>{minute < 10 ? `0${minute}` : minute}</span>:
          <span>{second < 10 ? `0${second}` : second}</span>
          <span>
            {/* {mili < 10 ? ` 00${mili}` : mili < 100 ? `0${mili}` : mili} */}
          </span>
        </h2>
        <br />
        <ul className="time-split-list"></ul>
      </div>
      <div className="btn-list">
        <button className="btn btn-stop" onClick={handleStop}>
          Stop
        </button>
        <button className="btn btn-start" onClick={handleStart}>
          Start
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
        <button className="btn" onClick={handleSplit}>
          Split
        </button>
      </div>
    </div>
  );
}

export default App;

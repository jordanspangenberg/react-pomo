import React, { Component } from "react";
import {
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import Countdown, { zeroPad } from "react-countdown-now";
import Clock from '../components/Clock'

const renderer = ({ minutes, seconds }) => {
  return (
    <span>
      {minutes}:{zeroPad(seconds)}
    </span>
  );
};


function TimerControl({ time, label, session, onHandleTime }) {
  return (
    <div className="grid timer-control">
      <h2 id={`${label}-label`}>
        {label === "session" ? "Session" : "Break"} Length
      </h2>
      <FaArrowUp
        className="icon"
        id={`${label}-increment`}
        size={70}
        onClick={() => onHandleTime(`${label}`, true)}
      />
      <FaArrowDown
        className="icon"
        id={`${label}-decrement`}
        size={70}
        onClick={() => onHandleTime(`${label}`, false)}
      />
      <h3 className={`${label}-length`}>
        <Timer time={time} session={session} />
      </h3>
    </div>
  );
}

function Timer({ time, session, handlePause, handleReset }) {
  return (
    <div className="grid">
      <Countdown
        date={Date.now() + time * 1000}
        renderer={renderer}
        autoStart={false}
      />
    </div>
  );
}

/* TimerControl.PropTypes = {
    time: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onHandleTime: PropTypes.func.isRequired
} */

export default class Pomo extends Component {
  state = {
    defaultSession: 25 * 60,
    defaultBreak: 5 * 60,
    currentSession: 25 * 60,
    currentBreak: 5 * 60,
    timeLeft: 25 * 60,
    session: true,
    running: false,
  };

  handleTime = (id, plus) => {
    this.setState({
      currentSession:
        id === "session"
          ? plus
            ? (this.state.currentSession += 60)
            : (this.state.currentSession -= 60)
          : this.state.currentSession,
      currentBreak:
        id === "break"
          ? plus
            ? (this.state.currentBreak += 60)
            : (this.state.currentBreak -= 60)
          : this.state.currentBreak
    });
  };

  handlePause = (myRef, running) => {
    //console.log('myref', myRef)
    console.log(this.state)
    myRef.current.isPaused() ? myRef.current.start() : myRef.current.pause()
    this.setState({
      running: !running
    })
  };

  handleReset = (myRef) => {
    myRef.current.pause()
    this.setState({
      currentSession: this.state.defaultSession,
      currentBreak: this.state.defaultBreak, 
      timeLeft: this.state.defaultSession,
      running: false
    })

  };

  render() {
    const { currentSession, currentBreak, timeLeft } = this.state;
    return (
      <div className="container">
        <TimerControl
          time={currentSession}
          label="session"
          onHandleTime={this.handleTime}
        />
        <TimerControl
          time={currentBreak}
          label="break"
          onHandleTime={this.handleTime}
        />
        <div className="timer" id="timer-label">
          {this.state.session === true ? "Session" : "Break"}
        </div>
        <div className="timer">
          <Clock
            time={
              Date.now() +
              (this.state.session === true
                ? this.state.currentSession
                : this.state.currentBreak) *
                1000
            }
            session={this.state.session}
            handlePause={this.handlePause}
            handleReset={this.handleReset}
            running={this.state.running}
          />
        </div>
      </div>
    );
  }
}

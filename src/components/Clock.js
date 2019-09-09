import React from "react";
import Countdown, { zeroPad } from "react-countdown-now";
import { FaPlay, FaPause, FaUndo } from "react-icons/fa";


export default function Clock({
  time,
  session,
  handlePause,
  handleReset,
  running
}) {
  let myRef = React.createRef();

  
  

  return (
    <div className="grid">
      <Countdown
        date={time}
        renderer={rendererWithMessage}
        autoStart={false}
        ref={myRef}
      />

      {console.log(myRef)}
      {!running ? (
        <FaPlay id="start_stop" onClick={() => handlePause(myRef, running)} />
      ) : (
        <FaPause id="start_stop" onClick={() => handlePause(myRef, running)} />
      )}
      <FaUndo id="reset" onClick={() => handleReset(myRef)} />
    </div>
  );
}

const rendererWithMessage = ({ minutes, seconds, completed, session }) => {
  if (completed) {
    // Render a complete state
    return (
      <div>
        {session
          ? "Session finished, begin break"
          : "Break over, next session begins"}
      </div>
    );
  } else {
    // Render a countdown
    return (
      <span>
        {minutes}:{zeroPad(seconds)}
      </span>
    );
  }
};

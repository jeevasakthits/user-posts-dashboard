import React, { useState, useEffect } from "react";
import "../styles/postsHeaderStyle.scss";
import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function Timer({ time, countryTimeData }) {
  return (
    <div className="timer">
      <div className="countryTimeZone">
        {countryTimeData?.datetime?.split("T")[0]}{" "}
        {countryTimeData.abbreviation}
        {/* countryTimeData.timezone */}
      </div>
      <span className="digits">
        {("0" + Math.floor((time / 3600000) % 24)).slice(-2)} :
      </span>
      <span className="digits">
        {" "}
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)} :
      </span>
      <span className="digits">
        {" "}
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );
}
function ControlButtons({ active, isPaused, handlePauseResume, handleStart }) {
  return (
    <button className="timeControlButton" onClick={handlePauseResume}>
      {isPaused ? "Start" : "Stop"}
    </button>
  );
}
function PostsHeader({
  countryTime = 0,
  countryTimeData,
  setCountrySelected,
  getCountryTime,
  countrySelected,
  countries,
}) {
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(countryTime);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Grid container md={11} className="countryTimeContainer">
      <Grid item md={4} sm={12} xs={12} className="autoCompleteGrid">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disableClearable
          style={{
            display: "contents;",
            cursor: "pointer",
          }}
          onChange={(e) => {
            setCountrySelected(e.target.textContent);
            getCountryTime(e.target.textContent);
          }}
          value={countrySelected}
          options={countries}
          renderInput={(params) => (
            <TextField
              {...params}
              label={countrySelected === "" ? "Counties" : ""}
            />
          )}
        />
      </Grid>
      <Grid md={4} sm={8} xs={12} className="countryTimeGrid">
        <Timer time={time} countryTimeData={countryTimeData} />
      </Grid>
      <Grid md={2} sm={4} xs={12} className="controlButtonGrid">
        <ControlButtons
          active={isActive}
          isPaused={isPaused}
          handleStart={handleStart}
          handlePauseResume={handlePauseResume}
        />
      </Grid>
    </Grid>
  );
}

export default PostsHeader;

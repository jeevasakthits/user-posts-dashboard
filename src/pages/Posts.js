import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import "../styles/postsStyle.scss";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import PostsHeader from "../components/PostsHeader";
import BackButton from "../components/BackButton";

export default function Posts() {
  const statVal = useLocation();
  const [countries, setCountries] = useState([]);
  const [countryTime, setCountryTime] = useState({});
  const [countrySelected, setCountrySelected] = useState("");
  const [countryTimeInSec, setCountryTimeInSec] = useState(0);
  const [loader, setLoader] = useState(true);
  const userDetails = statVal.state.user;
  const userPosts = statVal.state.posts;

  const getTime = (timeData) => {
    let time = timeData.datetime.split("T")[1].split(".")[0].split(":");
    let currentTimeSec =
      parseInt(time[0]) * 3600000 +
      parseInt(time[1]) * 60000 +
      parseInt(time[2]) * 1000;
    return currentTimeSec;
  };

  useEffect(() => {
    setLoader(true);
    axios
      .get(`http://worldtimeapi.org/api/timezone`)
      .then((response) => {
        setCountries(response.data);
        setCountrySelected(response.data[0]);
        axios
          .get(`http://worldtimeapi.org/api/timezone/` + response.data[0])
          .then((res) => {
            setCountryTime(res.data);
            setCountryTimeInSec(getTime(res.data));
            setLoader(false);
          })
          .catch(() => {
            alert("Something went worng!!!");
          });
      })
      .catch(() => {
        alert("Something went worng!!!");
      });
  }, []);

  const getCountryTime = (selectedCountry) => {
    axios
      .get(`http://worldtimeapi.org/api/timezone/` + selectedCountry)
      .then((res) => {
        setCountryTime(res.data);
        setCountryTimeInSec(getTime(res.data));
        setLoader(false);
      })
      .catch(() => {
        alert("Something went worng!!!");
      });
  };

  const UserList = () => {
    return (
      <Grid container md={12} className="userContainer">
        <Grid item md={3} sm={12} xs={12} className="backbuttonContainer">
          <BackButton />
        </Grid>
        <Grid item md={9} sm={12} xs={12} className="containerforCountry">
          <PostsHeader
            countryTime={countryTimeInSec}
            countryTimeData={countryTime}
            setCountrySelected={setCountrySelected}
            getCountryTime={getCountryTime}
            countrySelected={countrySelected}
            countries={countries}
          />
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          className="containerForPostsDashboard"
        >
          <Grid item md={12} className="pageTitle">
            Profile Page
          </Grid>
          <Grid item md={12} className="userDetailsCartItem">
            <Grid container className="userDetailsCardContainer">
              <Grid item md={8} sm={8} xs={12} className="userDetail">
                <div className="userDetailHeader">Name</div>
                <div> {userDetails.username}</div>
                <i> {userDetails.company.catchPhrase}</i>
              </Grid>
              <Grid item md={4} sm={4} xs={12} className="addressDetail">
                <div className="userDetailHeader">Address</div>
                <div> {userDetails.address.street}</div>
                <div> {userDetails.address.city}</div>
                <div> {userDetails.address.zipcode}</div>
                <div> {userDetails.email}</div>
                <div> {userDetails.phone}</div>
              </Grid>
            </Grid>
            {/*<Grid md={12} className="mobemailContainer">
              <div className="emailmobdiv">
                <div> Email: {userDetails.email}</div>
                <div> Phone No: {userDetails.phone}</div>
              </div>
    </Grid>*/}
          </Grid>
          <ul className="list">
            {userPosts.map((post, index) =>
              post.userId == userDetails.id ? (
                <li className="list-item">
                  <div className="list-content">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                  </div>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container className="postsPageContainer">
      {loader ? (
        <Grid container md={12} className="loaderContainer">
          <CircularProgress />
        </Grid>
      ) : (
        <UserList />
      )}
    </Grid>
  );
}

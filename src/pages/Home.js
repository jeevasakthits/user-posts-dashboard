import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import "../styles/homeStyle.scss";
import PostsList from "../components/PostsList";
// import NewTab from "../assets/icons8-new-tab.svg";

export default function () {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const modelRef = useRef();

  useEffect(() => {
    setLoader(true);
    const urls = [
      "https://jsonplaceholder.typicode.com/users",
      "https://jsonplaceholder.typicode.com/posts",
    ];
    Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
      .then(([usersList, postsList]) => {
        setUsers(usersList);
        setPosts(postsList);
        setLoader(false);
      })
      .catch(() => {
        alert("Something went worng!!!");
      });

    // axios
    //   .get(`https://jsonplaceholder.typicode.com/users`)
    //   .then((response) => {
    //     setUsers(response.data);
    //   axios
    //   .get(`https://jsonplaceholder.typicode.com/posts`)
    //   .then((res) => {
    //     setPosts(res.data)
    //   })
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });
  }, []);

  const getPostsCount = (userData) => {
    return posts.filter(function (user) {
      return user.userId == userData.id;
    }).length;
  };

  const openPopUp = () => {
    modelRef.current.style.display = "block";
  };
  const closePopUp = () => {
    modelRef.current.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modelRef.current) {
      modelRef.current.style.display = "none";
    }
  };

  const UserList = () => {
    return (
      <Grid container md={12} className="userContainer">
        <Grid item md={12} className="pageTitle">
          Directory
        </Grid>
        {users.map((user, index) => (
          <Grid item md={12} key={user.name + index} className="userCartItem">
            <Grid container className="userCardContainer">
              <Grid item md={11} sm={10} xs={12}>
                {" "}
                <Link
                  to={`/posts/` + user.username.toLowerCase()}
                  state={{ user: user, posts: posts }}
                  className="postNavigationLink"
                >
                  Name: {user.name}
                  {/*<img src={NewTab} className="navigateIconStyle" />*/}
                </Link>
              </Grid>
              <Grid
                item
                md={1}
                sm={2}
                xs={12}
                className="postsCount"
                onClick={openPopUp}
              >
                <span> Posts: {getPostsCount(user)}</span>
              </Grid>
              <div id="myModal" className="modal" ref={modelRef}>
                <div className="modal-content">
                  <span className="close" onClick={closePopUp}>
                    &times;
                  </span>
                  <div>
                    <PostsList userPosts={posts} userDetails={user} />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid container md={12} className="homePageContainer">
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

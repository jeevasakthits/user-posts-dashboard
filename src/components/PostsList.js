import React, { useEffect, useState } from "react";
import "../styles/homeStyle.scss";
import { Grid } from "@mui/material";

export default function PostsList({ userPosts, userDetails }) {
  return (
    <Grid item md={12} sm={12} xs={12} className="containerForPostsDashboard">
      <Grid item md={12} className="pageTitle">
        Posts
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
  );
}

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommentInput from "../components/commentInput";
import PostBody from "../components/postBody.jsx";
import Comment from "../components/comment.jsx";

//get request for comments should be done as an onclick in main body so this page just needs to assign items in currentPost to show, and then pulls
//state of currentComments and renders them
function PostBodyContainer() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.userReducer.errorMessage);

  const handleClick = () => {
    fetch('/deletePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setReply(data);
      })
      .catch((err) => {
        console.log(err);
        console.log('failed deleting post');
      });
  }

  return (
    <div>
      <PostBody />
      <Comment />
      <CommentInput />
      <button onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}

export default PostBodyContainer;

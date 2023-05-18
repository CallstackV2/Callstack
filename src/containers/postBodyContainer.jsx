import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentInput from '../components/commentInput';
import PostBody from '../components/postBody.jsx';
import Comment from '../components/comment.jsx';

//get request for comments should be done as an onclick in main body so this page just needs to assign items in currentPost to show, and then pulls
//state of currentComments and renders them
function PostBodyContainer(props) {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.userReducer.errorMessage);
  // const { post } = props;
  const currentPost = useSelector((state) => state.userReducer.currentPost);
  const postId = currentPost._id;

  const deletePost = () => {
    console.log('test post:', currentPost);
    console.log('postid:', postId);
    fetch('/main/deletePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: postId }),
    })
      .then((data) => {
        console.log('DELETED!');
        alert('Successfully deleted this post!');
        //return data.json();
      })
      .catch((err) => {
        console.log(err);
        console.log('failed deleting post');
      });
  };

  const updatePost = () => {
    fetch('/main/updatePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: postId }),
    })
      .then((data) => {
        data.json();
      })
      .catch((err) => {
        console.log(err);
        console.log('failed deleting post');
      });
  };

  return (
    <div>
      <PostBody />
      <Comment />
      <div className="commentContainer">
        <CommentInput />
        <button className="deleteButton" onClick={deletePost}>
          Delete Post
        </button>
       <button onClick={updatePost}>Edit</button>
      </div>

    </div>
  );
}

export default PostBodyContainer;

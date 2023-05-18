import React from "react";
import "../stylesheets/postPageStyles.scss";
import { setCurrentComments, setErrorMessage } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";

function CommentInput() {
  let dispatch = useDispatch();
  let currentPostId = useSelector((state) => state.userReducer.currentPostId);
  //onClick of comment button, send a post request of the comment to the database
  //then update state of currentComments
  function getComments(postId) {
    fetch('/main/getPostComments', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        postId: postId,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch(setCurrentComments('delete'));
        const commentArray = [];
        for (let i = 0; i < res.length; i++) {
          commentArray.push(res[i].commentBody);
        }
        console.log(`commentArray on main page: ${commentArray}`);
        dispatch(
          setCurrentComments(
            commentArray
            // UPDATE currentComments from HTML element to an object with properties:
            // <div className="currentCommentBody">
            //   {/* <p>{res[i].userId}</p> */}
            //   <p>{res[i].commentBody}</p>
            //   {/* <p>{mockComments[i].numLikes}</p> */}
            // </div>
          )
        );
      });
  }


  function postComment(comment) {
    fetch("/main/createPostComments", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        postId: currentPostId,
        commentBody: comment,
      }),
    }).then((res) => {
      if (res.body) {
        dispatch(setErrorMessage([]));
        dispatch(
          setCurrentComments({comment})
        )
        getComments(currentPostId)
      } else {
        dispatch(setErrorMessage([<p></p>]));
      }
    });
  }

  return (
    <div class="commentBox">
      <input class="input" placeholder="Write your comment here"></input>
      <button
        class="commentButton"
        type="submit"
        onClick={() => {
          postComment(document.querySelector(".input").value);
          document.querySelector(".input").value = "";
        }}
      >
        Comment
      </button>
    </div>
  );
}

export default CommentInput;

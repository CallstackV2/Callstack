import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPost, setCurrentPostId, setCurrentComments } from '../store/userReducer';
import { useNavigate } from "react-router-dom";

//This will render the actual title and post
//need to pull what the current title and post are from state
//

function MainPagePost(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const currentPost = useSelector((state) => state.userReducer.currentPost);
  // const currentPostId = useSelector((state) => state.userReducer.currentPostId);
  // console.log(props.post)
  const { post } = props; 

  function getComments(postId) {
    fetch("/main/getPostComments", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        postId: postId,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch(setCurrentComments("delete"));
        for (let i = 0; i < res.length; i++) {
          dispatch(
            setCurrentComments(
              // UPDATE currentComments from HTML element to an object with properties: 
              <div className="currentCommentBody">
                {/* <p>{res[i].userId}</p> */}
                <p>{res[i].commentBody}</p>
                {/* <p>{mockComments[i].numLikes}</p> */}
              </div>
            )
          );
        }
      });
  }

  return (
    <div>
      <button
        className='mainPost'
        onClick={() => {
          dispatch(
            setCurrentPost(
                post
                //NNEEEEEEDS TO BE CHANGEDDDD TO THE 
            //   <div className='currentClickedPost'>
            //     <h1>{posts[i].postTitle}</h1>
            //     <p>{posts[i].postBody}</p>
            //     <div>{posts[i].postTag}</div>
            //     <div>{posts[i].numLikes}</div>
            //     <div>{posts[i].numComments}</div>
            //   </div>
            )
          );
          // post._id should contain the postid for that specific post
          dispatch(setCurrentPostId(post._id));
          getComments(post._id);
          navigate(`../post`);
        }}
      >
        <h1>{post.postTitle}</h1>
        <p>{post.postBody}</p>
        <div>{post.postTag}</div>
        <div>{post.numLikes}</div>
        <div>{post.numComments}</div>
        <div>{post._id}</div>
      </button>

      {/* <div>
        <button>Tags</button>
        <button>Like</button>
        <button>Comment</button>
        <button>Date</button>
      </div> */}
    </div>
  );
}

export default MainPagePost;

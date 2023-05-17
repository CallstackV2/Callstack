import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPost, setCurrentPostId } from '../store/userReducer';

//This will render the actual title and post
//need to pull what the current title and post are from state

function MainPagePost(props) {
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state.userReducer.currentPost);
  // console.log(props.post)
  const { post } = props; 
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
          getComments(post._id);
          dispatch(setCurrentPostId(post._id));
          navigate(`/post`);
        }}
      >
        <h1>{post.postTitle}</h1>
        <p>{post.postBody}</p>
        <div>{post.postTag}</div>
        <div>{post.numLikes}</div>
        <div>{post.numComments}</div>
        Button Text
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

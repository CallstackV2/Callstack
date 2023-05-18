//  we have no patience yes ultra
import React, { useState, useEffect } from 'react';

// import React from 'react';
// import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  setCurrentUser,
  setErrorMessage,
  setCurrentComments,
  setCurrentPost,
  setAllPosts,
  setTags,
} from '../store/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import MainPagePost from '../components/MainPagePost';

function SubContainer() {
  const allPosts = useSelector((state) => state.userReducer.allPosts);

  const [postArray, setPostArray] = useState([]);

  console.log('entered SubContainer component');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  //onClick of post will ivoke this function, so the onclick will have to pass in the currentPost id
  function mockPostOpen() {
    //fetch all comments for post
    fetch('/comments', {
      method: 'Get',
      headers: {
        'Content-Type': 'Application/JSON',
      },
    }).then((res) => {
      if (res.body) {
        dispatch(setErrorMessage([]));
        dispatch(setCurrentPost(postId));
        dispatch(setCurrentComments(res));
        navigate(`/post`);
      } else {
        dispatch(setErrorMessage([<p>No post found</p>]));
      }
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  // const postArray = [];
  function getPosts() {
    console.log('entered getPosts function');
    fetch('/main/getAll')
      .then((response) => response.json())
      .then((posts) => {
        console.log('I am in getPosts');

        let updatedPostArray = [];
      

        for (let i = 0; i < posts.length; i++) {
          dispatch(
            setAllPosts(
              
                {
                title: posts[i].title,
                body: posts[i].body,
                tags: posts[i].postTag,
                numLikes: posts[i].numLikes,
                numComments: posts[i].numComments,
              }
            )
          );
          updatedPostArray.push(
            <MainPagePost post={posts[i]} id={i} key={i} />
          );

          // stateArray.push({
          //       title: posts[i].title,
          //       body: posts[i].body,
          //       tags: posts[i].postTag,
          //       numLikes: posts[i].numLikes,
          //       numComments: posts[i].numComments,
          //     });
        }
        console.log('updated post array', updatedPostArray);
        setPostArray(updatedPostArray);

        // console.log('state', stateArray)

        // dispatch(setAllPosts([<p>{stateArray[0].title}</p>]))

        // console.log('hi');
        // getPosts();
        // const allPosts = useSelector((state) => state.userReducer.allPosts);
        // console.log('current state of all posts:', allPosts)
        // console.log(allPosts);
        // let postArray = [];
        // for (let i = 0; i < allPosts.length; i++) {
        //   postArray.push(<mainPagePost post={allPosts[i]} id={i} />);
        // }
        console.log('current post array', postArray);
      })
      .catch((err) => {
        console.log('There was an error loading posts', err);
      });
  }

  // let posts = [];
  // for (let i = 0; i < allPosts.length; i++) {
  //   posts.push(<mainPagePost post={allPosts[i]} id={i} />);
  // }
  // console.log(`postArray: ${postArray}`);
  return (
    <div className = "allPostsDiv">
      <div>
        {postArray.map((post, index) => (
          <div key={index}>{post}</div>
        ))}
      </div>
    </div>
  );
}

export default SubContainer;

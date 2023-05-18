import React, { useEffect } from "react";
import TagDropDownButton from "./TagDropDownButton";
import TagLinks from "./tagLinks";
import { useSelector, useDispatch } from "react-redux";
import { setAllPosts, setCurrentPost } from "../store/userReducer";
import { useNavigate } from "react-router-dom";
import SubContainer from '../containers/subContainer';

function PostBar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

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
        }
        console.log('updated post array', updatedPostArray);
        setPostArray(updatedPostArray);

        console.log('current post array', postArray);
      })
      .catch((err) => {
        console.log('There was an error loading posts', err);
      });
  }

  function makePost(newPostTitle, newPostBody, postTag) {
    fetch("/main/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        postTitle: newPostTitle,
        postBody: newPostBody,
        postTag: postTag,
      }),
    }).then(() => {
      dispatch(
        setAllPosts({
          title: newPostTitle,
          body: newPostBody,
          tags: postTag,
          numLikes: 0,
          numComments: 0,
        })
      );
      getPosts();
      window.location.reload();
    });
  }
  return (
    <div className="postBar">
      <div>
        <input type="text" placeholder="Enter a title" id="newPostTitle" />
        <br />
        <textarea
          type="text"
          placeholder="Enter your post"
          id="newPostBody"
          cols="40"
          rows="5"
        />
        <br />
        <div className="dropdown tagDiv">
          <TagDropDownButton tagLink="Tag" />
          <TagLinks />
        </div>

        <button
          className="postButtonSubmit"
          type="submit"
          onClick={() => {
            makePost(
              document.querySelector("#newPostTitle").value,
              document.querySelector("#newPostBody").value,
              "uncategorized"
            );
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default PostBar;

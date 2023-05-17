import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./store/userReducer";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import PostPage from "./pages/postPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const currentPost = useSelector((state) => state.userReducer.currentPost);

  // if sesssion id cookie exists in database, set currentUser to username
  // navigate to /currentUser

  useEffect(() => {
    // fetch to server to check for a session cookie
    fetch('/login/auth')
      .then(res => res)
      .then(res => {
        // if the server returns a 200 status code, set CurrentUser (on State) to the response from the server, which is the logged in user's username
        if (res.status === 200) dispatch(setCurrentUser(res));
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <Routes>
      <Route path={`/post`} element={<PostPage />} />{" "}
      {/* <Route path={`/${currentUser}/${currentPost}`} element={<PostPage />}/> */}
      <Route path="/signuppage" element={<SignUpPage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path={`/`} element={<MainPage />} />
    </Routes>
  );
}

//   const username = useSelector(state=> state.userReducer.currentUser)
//   const dispatch = useDispatch();

//   function creatUser(newUser) {
//     dispatch(currentUser(newUser))
//     fetch("sending to server to store new user in DB")
//   }

//   <div>{username}
//   <button onClick={()=>{createHashRouter('kevin')}}>click me</button>
//   </div>

export default App;

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from "../store/userReducer";

function LogOut() {
    const dispatch = useDispatch();
    
    return (
      <button id="logOut" onClick={() => {
        fetch("login/logout");
        dispatch(setCurrentUser(null));
      }}>Log Out</button>
    );
  }

export default LogOut;
import React from "react";
import SearchBar from "./SearchBar";
import LogOut from "./LogOut";

function MainPageNavBar() {
  function searchForPost(text) {}

  return (
      <div className="mainPageNavBar">
        <i class="fa-solid fa-otter otterLogo"></i>

        <div className="navBarRight">
          <SearchBar />
          <LogOut />
        </div>
      </div>
  );
}

export default MainPageNavBar;

import React from "react";

export default function FooterFooter() {
  return (
    <div className="footerFooter">
      <p className="bottomBottom">© 2023 Tasselled, Inc.</p>
      <p className="bottomBottom">
        Iterated with <span className="bottomHeart">♥</span> by James A., Yueran,
        Mike B., James M., and Aalayah
      </p>
      <div className="bottomBottom">
        <a
          onClick={() => {
            window.location.href = "https://github.com/jadler999";
          }}
        >
          <i className="fa-brands fa-github githubLogo sjk06"></i>
        </a>
        <a
          onClick={() => {
            window.location.href = "https://github.com/kneazle714";
          }}
        >
          <i className="fa-brands fa-github githubLogo praisepelumi"></i>
        </a>
        <a
          onClick={() => {
            window.location.href = "https://github.com/mikebednarz";
          }}
        >
          <i className="fa-brands fa-github githubLogo evramdawd"></i>
        </a>
        <a
          onClick={() => {
            window.location.href = "https://github.com/j-mccoll";
          }}
        >
          <i className="fa-brands fa-github githubLogo HShaw215"></i>
        </a>
        <a
          onClick={() => {
            window.location.href = "https://github.com/AalayahOlaes";
          }}
        >
          <i className="fa-brands fa-github githubLogo kfan1"></i>
        </a>
      </div>
    </div>
  );
}

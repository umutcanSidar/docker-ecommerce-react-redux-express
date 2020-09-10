import React from "react";

const Footer = () => (
  <nav className="uk-navbar-container uk-margin" data-uk-navbar="true">
    <div className="uk-navbar-left">
      <a className="uk-navbar-item uk-logo" href="#">
        Logo
      </a>

      <ul className="uk-navbar-nav">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Footer;

import React from "react";

const Homepage = () => {
  return (
    <div className="uk-container">
      <div className="uk-grid">
        <div className="uk-width-1-1">
          <div
            className="uk-position-relative uk-visible-toggle"
            tabIndex="-1"
            data-uk-slider="center: true"
          >
            <ul className="uk-slider-items uk-grid uk-margin-small-top">
              <li className="uk-width-1-1">
                <div className="uk-panel">
                  <img src="images/slider.jpg" alt="" />
                </div>
              </li>
              <li className="uk-width-1-1">
                <div className="uk-panel">
                  <img src="images/slider.jpg" alt="" />
                </div>
              </li>
              <li className="uk-width-1-1">
                <div className="uk-panel">
                  <img src="images/slider.jpg" alt="" />
                </div>
              </li>
            </ul>

            <a
              className="uk-position-center-left uk-position-small uk-hidden-hover"
              href="#"
              data-uk-slidenav-previous
              data-uk-slider-item="previous"
            ></a>
            <a
              className="uk-position-center-right uk-position-small uk-hidden-hover"
              href="#"
              data-uk-slidenav-next
              data-uk-slider-item="next"
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;

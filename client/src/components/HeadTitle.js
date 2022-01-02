import React from "react";

const HeadTitle = (props) => {
  const url = props.match.url.split("/");
  return (
    <div className="uk-width-1-1">
      <h1 className="uk-heading-bullet uk-margin-bottom uk-margin-remove-top">{url[1] === "payment" ? "Order" : url[1].charAt(0).toUpperCase() + url[1].slice(1)}</h1>
    </div>
  );
};

export default HeadTitle;

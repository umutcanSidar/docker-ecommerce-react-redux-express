import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Profilepage = (props) => {
  const dispatch = useDispatch();

  //GET LOGIN STATE
  const login = useSelector((state) => state.login);
  const { userInfo } = login;

  //GET USER INFO BY :id STATE
  const user = useSelector((state) => state.user);
  const { getUserByOne, loading } = user;

  React.useEffect(() => {

    return () => {
      //
    };
  }, []);

  return (
    <div className="uk-container">
      {getUserByOne && (
        <div className="uk-grid">
          <div className="uk-width-1-1">
            <h1 className="uk-heading-bullet uk-margin-bottom">Profile</h1>
          </div>
          <div className="uk-width-1-6">
            <img
              className="uk-border-pill"
              src={userInfo.image}
              alt="Border pill"
            />
          </div>
          <div className="uk-width-auto">
            <div style={{ textTransform: "capitalize" }}>
              {getUserByOne.name} {getUserByOne.surname}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profilepage;

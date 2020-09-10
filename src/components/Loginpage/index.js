import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../actions/userActions";

const Loginpage = (props) => {
  const [auth, setAuth] = React.useState({});

  // GET LOGIN STATE
  const login = useSelector((state) => state.login);
  const { loading, userInfo, error } = login;
  const dispatch = useDispatch();

  const onHandleInput = (e) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {
      // cleanup
    };
  }, [userInfo]);

  const onSubmitted = (e) => {
    e.preventDefault();
    dispatch(signIn(auth));
  };

  return (
    <div className="uk-container">
      <div className="uk-grid">
        <div className="uk-width-1-1">
          <h1 className="uk-heading-bullet uk-margin-bottom">Login</h1>
        </div>
        <div className="uk-width-1-3 uk-margin-auto">
          {loading && <div>loading...</div>}
          {error && (
            <div className="uk-alert-danger" data-uk-alert>
              <a className="uk-alert-close" data-uk-close></a>
              <p>{error.message}</p>
            </div>
          )}
          <form onSubmit={(e) => onSubmitted(e)}>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Username
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  type="text"
                  name="username"
                  onChange={(e) => onHandleInput(e)}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Password
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  type="password"
                  name="password"
                  onChange={(e) => onHandleInput(e)}
                  autoComplete="true"
                />
              </div>
            </div>
            <div className="uk-margin">
              <button type="submit" className="uk-button uk-button-default">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;

import { Link, NavLink } from "react-router-dom";

import "./Button.css";

function Button(props) {
  const { type, text, href, state, request } = props;
  // type - Button/Submit
  // text - text
  // href - link to the page
  // state - function reference
  // request - function request
  // !it is worth using only a couple of state request or href!

  return (
    <div className="ButtonComponent">
      {href ? (
        <div className="hrefButtonWrapper">
          <button type={type} className="hrefButton">
            <NavLink
                to={ href }
                className={({ isActive }) => (isActive ? "activeButton" : "button")}
            ></NavLink>
            <p>{text}</p>
          </button>
        </div>
      ) : (
        <div className="stateButtonWrapper">
          <button
            type={type}
            className="stateButton"
            onClick={() => {
              state(request);
            }}
          >
            <p>{text}</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Button;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import style from "./Header.module.css";

const Header = () => {
  const [focus, setFocus] = useState();
  const handleClick = () => {
    setFocus("is-active");
  };
  const readLocalStorage = JSON.parse(localStorage.getItem("users"));

  return (
    <header className={style.Header}>
      <nav className={style.Nav}>
        <div className="icon-text is-flex is-align-content-center is-justify-content-center px-6  ">
          <span className=" is-flex is-flex-direction-column is-justify-content-center  is-align-items-center">
            <img
              className={style.Img}
              src="../src/assets/burger.png"
              alt="logo burger"
            />

            <strong className={style.NameLogo}>Burger Queen</strong>
          </span>
        </div>
        {readLocalStorage ? (
          <div className=" is-flex p-4 is-align-items-end is-4">
            <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center  ">
              <img
                className={style.avatar}
                src={readLocalStorage.user.image_user}
              />
              <span>
                <strong className="is-size-6">
                  {readLocalStorage.user.name_user}
                </strong>
              </span>
              <span className="tag has-background-warning ">Waiter</span>
            </div>
            <div className={`dropdown is-right  ${focus}`}>
              <div className="dropdown-trigger">
                <button
                  className="button is-large is-danger mb-2"
                  onClick={() => handleClick()}
                >
                  <span class="icon-text ">
                    <span className="icon has-text-black">
                      <i className="fa-solid fa-caret-down "></i>
                    </span>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <div className="dropdown-item is-hover">{<Logout />}</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
};
export default Header;

import style from "./Login.module.css";
import PrivateRoute from "../../components/router/PrivateRoute";
import { useAuthContext } from "../../Context/authContext";
import { useState } from "react";

const { isAuthenticated } = useAuthContext;

const Login = () => {
  const { peticion } = useAuthContext();
  const [form, setForm] = useState("");
  const [viewPasswd, setViewPasswd] = useState("password");
  const handleOnclick = () => {
    setViewPasswd("text");
  };
  const handleOnblur = () => {
    setViewPasswd("password");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    peticion(form.email, form.password);
  };

  return (
    <section className={style.container}>
      <img
        className={style.img}
        src="https://github.com/aniapalominoq/DEV001-burger-queen-api-client/blob/main/src/assets/hamburger.png?raw=true"
        alt="burger"
      />
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="title is-1  has-text-centered">Login</h1>
        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <p className="control has-icons-left">
            <input
              id="email"
              className="input is-large"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={form.email}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="field has-addons is-flex">
            <div className="control has-icons-left is-flex-grow-3">
              <input
                id="password"
                className="input is-large"
                type={viewPasswd}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={form.password}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            <div className="control has-icons-left ">
              <div
                className="button is-large has-text-grey-light"
                onMouseOver={handleOnblur}
                onClick={handleOnclick}
              >
                <i className="fas fa-eye"></i>
              </div>
            </div>
          </div>
        </div>

        <button className="button is-large is-primary" type="submit">
          Sign In
        </button>
      </form>

      {isAuthenticated && <PrivateRoute />}
    </section>
  );
};
export default Login;

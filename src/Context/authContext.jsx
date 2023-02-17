import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from "react";
import PropTypes from "prop-types";
import { HOME } from "../config/routes/paths";
import { Navigate } from "react-router-dom";


export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("users") ?? false
  );

  const [loading, setLoading] = useState(false);
  const peticion = useCallback(function (email1, password1) {
    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({
        email: email1,
        password: password1,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLoading(false);
        //Guardar token en local storage
        localStorage.setItem("users", JSON.stringify(data));
        data.accessToken ? setIsAuthenticated(true) : setIsAuthenticated(false);
        const readLocalStorage = JSON.parse(localStorage.getItem("users"));

        if (readLocalStorage === "Cannot find user")
          return alert("Cannot find user");
        if (readLocalStorage === "Incorrect password")
          return alert("Incorrect password");

        /*  if (data.accessToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          alert("no tiene permiso de acceso");
        } */
      })
      .catch((error) => alert(`${error}, "Clave Incorrecta"`));
}, []);

  // const login2 = useCallback(function () {
   
    
    // const [loading, setLoading] = useState(false);

  //   return {
      // form,
      // errors,
      // loading,
  //     setIsAuthenticated,
      // handleChange,
      // handleBlur,
      // handleSubmit,
  //   };
  // }, []);

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      peticion,
      // login2,
      logout,
      isAuthenticated,
      setIsAuthenticated,
    }),
    [peticion, logout, isAuthenticated,setIsAuthenticated]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}

import React from "react";
import { Link } from "react-router-dom";
import { PRIVATE } from "../../config/routes/paths";
import { useAuthContext } from "../../Context/authContext";
import Swal from "sweetalert2";

const Logout = () => {
  const { isAuthenticated } = useAuthContext;
  const setcloset = () => {
    if (!isAuthenticated) {
      console.log("fsfdhAGS", isAuthenticated);
      return Swal.fire({
        title: "Log out?",
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#00D1B2",
        cancelButtonColor: "#F14668",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear("users");
          location.reload();
          Swal.fire("Log out!", "Your section has been closed", "success");
        }
      });
    }
  };
  return (
    <>
      <Link to={PRIVATE} className="" onClick={setcloset}>
        <span className="">Sign off</span>
      </Link>
    </>
  );
};

export default Logout;

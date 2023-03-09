import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import style from "./WaiterView.module.css";

const WaiterView = () => {
  const [arrayTables, setArrayTables] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/tables")
      .then((res) => res.json())
      .then((data) => setArrayTables(data));
  }, []);

  return (
    <>
      <h1 className="title is-3 has-text-centered pt-4">Tables</h1>
      <section className={style.container}>
        {arrayTables.length === 0 ? (
          <Loader />
        ) : (
          arrayTables.map((elem) => (
            <Link
              to="/waiterView/orders"
              className="box  is-flex is-flex-direction-column is-justify-content-center"
              key={elem.id_table}
            >
              <span className="field is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
                <img className={style.img} src="src/assets/table.png" />

                <span className="title is-3 has-text-centered ">
                  N° {elem.number_table}
                </span>
              </span>
            </Link>
          ))
        )}
        <Link
          to="/waiterView/orders"
          className="box  is-flex is-flex-direction-column is-justify-content-center"
        >
          <span className="field is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
            <span className="title is-3 has-text-centered ">+</span>
          </span>
        </Link>
      </section>
    </>
  );
};

export default WaiterView;

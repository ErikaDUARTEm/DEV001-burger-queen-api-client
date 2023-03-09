import React, { useRef, useState } from "react";
import { useAuthContext } from "../Context/authContext";

const Table = () => {
  const tdRef = useRef();
  const buttonRefPlus = useRef();
  const buttonRefMinus = useRef();
  const { arrayContext, setArrayContext } = useAuthContext();

  const [count, setCount] = useState(1);

  const counterPlus = (value) => {
    console.log(tdRef.current);

    console.log("*************", valueTd, valueButtonPlus, value);
    if (valueTd === value) {
      setCount(count + 1);
    }
  };
  return (
    <>
      <div className="columns has-background-primary is-3 is-narrow-tablet has-text-white is-flex is-centered">
        <div className="column is-offset-x mx-6">
          <h1>ORDERS</h1>
        </div>
        <div className="column  is-offset-x">
          <h2>TABLE:</h2>
        </div>
        <div className="column is-offset-x">
          <input
            className="input is-primary is-one-quarter is-medium"
            type="text"
            placeholder="Name Client"
          />
        </div>
      </div>
      <table className="table has-background-primary-light ">
        <thead>
          <tr>
            <th>
              <abbr title="Position">ID</abbr>
            </th>
            <th>DESCRIPTION</th>
            <th>
              <abbr title="Played">UNIT PRICE</abbr>
            </th>
            <th></th>
            <th>
              <abbr title="Won">QTY</abbr>
            </th>
            <th></th>
            <th>
              <abbr title="Drawn">TOTAL</abbr>
            </th>
            <th>
              <abbr title="Lost">ACTION</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayContext.map((el, index) => (
            <>
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{el.name_product}</td>
                <td>$ {el.price_product}</td>
                <td>
                  <button
                    id={`${el.id_product * 10}`}
                    ref={buttonRefMinus}
                    className="button is-medium is-primary "
                    onClick={() => setCount(count <= 1 ? 1 : count - 1)}
                  >
                    <span className="icon is-medium">
                      <i className="fa-solid fa-minus"></i>
                    </span>
                  </button>
                </td>
                <td id={`${el.id_product * 20}`} ref={tdRef}>
                  {count}
                </td>
                <td>
                  <button
                    id={`${el.id_product}`}
                    ref={buttonRefPlus}
                    className="button is-primary is-medium"
                    onClick={() => counterPlus(el.id_product)}
                  >
                    <span className="icon is-medium">
                      <i className="fa-solid fa-plus"></i>
                    </span>
                  </button>
                </td>
                <td> ${el.price_product}</td>
                <td>
                  <button className="button is-primary is-normal">
                    DELETE
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      {arrayContext.length != 0 ? (
        <button className="button is-primary is-normal is-flex is-justify-content-center is-align-content-center">
          Send order
        </button>
      ) : null}
    </>
  );
};

export default Table;

import React from "react";
import { useAuthContext } from "../../Context/authContext";
import Slider from "../../components/Slider";
import Swal from "sweetalert2";

//import Table from "../../components/Table";

const Orders = () => {
  const { arrayContext, setArrayContext } = useAuthContext();
  console.log(arrayContext);

  const increaseProduct = (productOrder) => {
    if (arrayContext.find((el) => el.id_product === productOrder.id_product)) {
      const productUpdate = arrayContext.map((item) => {
        if (item.id_product === productOrder.id_product) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });

      return setArrayContext([...productUpdate]);
    }
    setArrayContext((arrayContext) => [...arrayContext, productUpdate]);
  };

  const decreaseProduct = (productOrder) => {
    if (productOrder.qty <= 1) {
      return 1;
    } else if (
      arrayContext.find((item) => item.id_product === productOrder.id_product)
    ) {
      const productUpdate = arrayContext.map((item) => {
        if (item.id_product === productOrder.id_product) {
          return { ...item, qty: item.qty - 1 };
        } else {
          return item;
        }
      });
      return setArrayContext([...productUpdate]);
    }
    setArrayContext((arrayContext) => [...arrayContext, productUpdate]);
  };

  const deleteProduct = (productOrder) => {
    Swal.fire({
      title: "Are you sure you want to delete the product?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#00D1B2",
      cancelButtonColor: "#F14668",
      confirmButtonText: "¡delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        setArrayContext(
          arrayContext.filter((elements) => elements != productOrder)
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product successfully removed.",
          showConfirmButton: false,
          timer: 800,
        });
      }
    });
  };

  return (
    <>
      <Slider />
      <article className="panel is-primary mx-4">
        <p className="panel-heading">Orders</p>

        <div className="panel-block is-flex ">
          <div className="field mx-4">
            <label className="label">N° Table</label>
            <div className="control ">
              <input className="input " type="text" value="1" />
            </div>
          </div>
          <div className="field mx-4">
            <label className="label">Client name</label>
            <div className="control has-icons-left">
              <input className="input " type="text" value="bulma" />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field mx-4">
            <label className="label">National Identity Number</label>
            <div className="control has-icons-left ">
              <input className="input " type="text" value="12345678" />
              <span className="icon is-small is-left">
                <i class="fa-sharp fa-regular fa-address-card"></i>
              </span>
            </div>
          </div>
        </div>
        {arrayContext.length != 0 ? (
          <>
            <div className="panel-block  is-flex is-justify-content-space-evenly is-align-items-center">
              <table className="table has-background-primary-light ">
                <thead>
                  <tr>
                    <th>
                      <abbr title="Position">Id</abbr>
                    </th>
                    <th>Description</th>
                    <th>
                      <abbr title="Played">Unit price</abbr>
                    </th>
                    <th></th>
                    <th>
                      <abbr title="Won">Qty</abbr>
                    </th>
                    <th></th>
                    <th>
                      <abbr title="Drawn">Sub total</abbr>
                    </th>
                    <th>
                      <abbr title="Lost">Action</abbr>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arrayContext.map((productOrder, index) => (
                    <>
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{productOrder.name_product}</td>
                        <td>$ {productOrder.price_product}</td>
                        <td>
                          <button
                            className="button is-primary is-medium"
                            onClick={() => decreaseProduct(productOrder)}
                          >
                            <span className="icon is-medium">
                              <i className="fa-solid fa-minus"></i>
                            </span>
                          </button>
                        </td>
                        <td>{productOrder.qty}</td>
                        <td>
                          <button
                            className="button is-primary is-medium"
                            onClick={() => increaseProduct(productOrder)}
                          >
                            <span className="icon is-medium">
                              <i className="fa-solid fa-plus"></i>
                            </span>
                          </button>
                        </td>
                        <td>
                          {" "}
                          ${productOrder.price_product * productOrder.qty}
                        </td>
                        <td>
                          <button
                            className="button is-danger is-medium"
                            onClick={() => deleteProduct(productOrder)}
                          >
                            <span className="icon is-medium">
                              <i className="fa-solid fa-trash-can"></i>
                            </span>
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="panel-block">
              <button className="button is-primary is-normal is-outlined is-fullwidth">
                Send order
              </button>
            </div>
          </>
        ) : null}
      </article>
    </>
  );
};

export default Orders;

import React, { useEffect, useState } from "react";
import Loader from "./Loader/Loader";

const Slider = () => {
  const [arrayProducts, setArrayProducts] = useState([]);
  const [valueFilter, setValueFilter] = useState("breakfast");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const array = data.filter((product) => {
          if (product.category_product === valueFilter) {
            return product;
          }
        });
        setArrayProducts(array);
      });
  }, [valueFilter]);

  const addButtonClick = (is_id_button) => {
    console.log("soy el button", is_id_button);
    const arrayOrderTemp = arrayProducts.filter((product) => {
      if (product.id_product === is_id_button) return product;
    });
    console.log("arrayOrderTemp", arrayOrderTemp);
    localStorage.setItem(`${is_id_button}`, JSON.stringify(arrayOrderTemp));
  };

  const handleChange = (value) => {
    setValueFilter(value);
  };

  return (
    <>
      <div className="is-flex is-justify-content-center is-align-content-center mt-4">
        <div className="field has-addons is-large">
          <div className="control is-toggle">
            <button
              onClick={() => handleChange("breakfast")}
              className="button is-rounded is-large is-primary is-outlined is-focused"
            >
              <span className="icon  is-large">
                <i className="fa-solid fa-mug-saucer"></i>
              </span>
              <span className="mx-4">Breakfast</span>
            </button>
          </div>
          <div className="control is-toggle">
            <button
              onClick={() => handleChange("lunch dinner")}
              className="button  is-rounded is-large  is-primary is-outlined"
            >
              <span className="icon is-large">
                <i className="fa-solid fa-burger"></i>
              </span>
              <span>Lunch dinner</span>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="field  is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-center">
        {arrayProducts.length === 0 ? (
          <Loader />
        ) : (
          arrayProducts.map((product) => (
            <section
              className="box mx-3 has-background-primary-light  is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
              key={product.id_product}
            >
              <figure className="image is-128x128">
                <img src={product.image_product} height="150px" width="216px" />
              </figure>
              <div className="field">
                <div className="title is-5 has-text-centered">
                  {product.name_product}
                </div>
                <div className="title is-4 has-text-centered">
                  ${product.price_product}.00
                </div>
              </div>
              <div className="control  ">
                <button
                  onClick={() => addButtonClick(product.id_product)}
                  id={`${product.id_product}`}
                  className="button is-primary is-normal"
                >
                  <span className="icon is-medium">
                    <i className="fa-sharp fa-solid fa-cart-plus"></i>
                  </span>
                  <span>add</span>
                </button>
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
};
export default Slider;

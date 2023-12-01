import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Header from "../layout/Header";
import CheckoutSteps from "./CheckoutStepsService";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const { cartItemss, shippingInfos } = useSelector((state) => state.carts);

  const { user } = useSelector((state) => state.auth);

  let navigate = useNavigate();

  // Calculate Order Prices

  const itemsPrice = cartItemss.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 25;

  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));

  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),

      shippingPrice,

      taxPrice,

      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/paymentService");
  };

  return (
    <Fragment>
      <Header /><br/><br/><br/>
      <div class="container">
        <MetaData title={"Confirm Order"} />

        <CheckoutSteps shipping confirmOrder />

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>

            <p>
              <b>Name:</b> {user && user.name}
            </p>

            <p>
              <b>Phone:</b> {shippingInfos.phoneNo}
            </p>

            <p className="mb-4">
              <b>Address:</b>{" "}
              {`${shippingInfos.address}, ${shippingInfos.city}, ${shippingInfos.postalCode}, ${shippingInfos.country}`}
            </p>

            <hr />

            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItemss.map((item) => (
              <Fragment>
                <hr />

                <div className="cart-item my-1" key={item.service}>
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img src={item.image} alt="Laptop" height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/service/${item.service}`}>{item.name}</Link>
                    </div>

                    {/* <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x ${item.price} ={" "}
                        <b>${(item.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div> */}
                  </div>
                </div>

                <hr />
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>

              <hr />

              <p>
                Subtotal:{" "}
                <span className="order-summary-values">${itemsPrice}</span>
              </p>

              <p>
                Shipping:{" "}
                <span className="order-summary-values">${shippingPrice}</span>
              </p>

              <p>
                Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p>
                Total: <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />

              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;

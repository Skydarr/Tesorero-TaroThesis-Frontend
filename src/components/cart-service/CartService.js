import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCarts, removeItemFromCart } from "../../actions/cartServiceActions";
import Header from "../layout/Header";

// import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'

const Cart = () => {
    const dispatch = useDispatch();

    const { cartItemss } = useSelector((state) => state.carts);

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const increaseQty = (id) => {
        // const newQty = quantity + 1;

        // if (newQty > stock) return;

        dispatch(addItemToCarts(id));
    };

    const decreaseQty = (id) => {
        // const newQty = quantity - 1;

        // if (newQty <= 0) return;

        dispatch(addItemToCarts(id));
    };

    let navigate = useNavigate();

    const checkoutHandler = () => {
        navigate("/login?redirect=shippingService");
    };

    return (
        <Fragment>
            <Header /><br/><br/><br/>
            <div class="container">
                <MetaData title={"Your Cart"} />

                {cartItemss.length === 0 ? (
                    <h2 className="mt-5">Your Service Cart is Empty</h2>
                ) : (
                    <Fragment>
                        <h2 className="mt-5">
                            Your Cart: <b>{cartItemss.length} items</b>
                        </h2>

                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">
                                {cartItemss.map((item) => (
                                    <Fragment>
                                        <hr />

                                        <div className="cart-item" key={item.service}>
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img
                                                        src={item.image}
                                                        alt="Laptop"
                                                        height="90"
                                                        width="115"
                                                    />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <Link to={`/services/${item.service}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">${item.price}</p>
                                                </div>

                                                {/* <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span
                                                            className="btn btn-danger minus"
                                                            onClick={() =>
                                                                decreaseQty(item.service, item.quantity)
                                                            }
                                                        >
                                                            -
                                                        </span>

                                                        <input
                                                            type="number"
                                                            className="form-control count d-inline"
                                                            value={item.quantity}
                                                            readOnly
                                                        />

                                                        <span
                                                            className="btn btn-primary plus"
                                                            onClick={() =>
                                                                increaseQty(
                                                                    item.service,
                                                                    item.quantity,
                                                                    item.stock
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div> */}

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i
                                                        id="delete_cart_item"
                                                        className="fa fa-trash btn btn-danger"
                                                        onClick={() => removeCartItemHandler(item.service)}
                                                    ></i>
                                                </div>
                                            </div>
                                        </div>

                                        <hr />
                                    </Fragment>
                                ))}
                            </div>

                            <div className="col-12 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h4>Service Summary</h4>

                                    <hr />

                                    {/* <p>
                                        Subtotal:{" "}
                                        <span className="order-summary-values">
                                            {cartItemss.reduce(
                                                (acc, item) => acc + Number(item.quantity),
                                                0
                                            )}{" "}
                                            (Units)
                                        </span>
                                    </p> */}

                                    <p>
                                        Est. total:{" "}
                                        <span className="order-summary-values">
                                            $
                                            {cartItemss
                                                .reduce(
                                                    (acc, item) => acc + item.price,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </span>
                                    </p>

                                    <hr />

                                    <button
                                        id="checkout_btn"
                                        className="btn btn-primary btn-block"
                                        onClick={checkoutHandler}
                                    >
                                        Check out
                                    </button>

                                    {/*<button id="checkout_btn" className="btn btn-primary btn-block" >Check out</button>*/}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default Cart;

import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Loader from "../layout/Loader";
import Header from "../layout/Header";
import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { NEW_REVIEWS_RESETSS } from "../../constants/serviceConstants";
import {
  getServiceDetails,
  newReviews,
  clearErrors,
} from "../../actions/serviceActions";
import { addItemToCarts } from "../../actions/cartServiceActions";
import ListServiceReviews from "../review/ListServiceReviews";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ServiceDetails = () => {
  // const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { error: reviewError, success } = useSelector(
    (state) => state.newReviews
  );

  const notify = (message = "") =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const addToCart = () => {
    dispatch(addItemToCarts(id));

    notify("Item Added to Cart");
  };

  const dispatch = useDispatch();

  let { id } = useParams();

  const { loading, error, service } = useSelector(
    (state) => state.serviceDetails
  );

  useEffect(() => {
    dispatch(getServiceDetails(id));

    if (error) {
      notify(error);

      dispatch(clearErrors());
    }

    if (reviewError) {
      notify(reviewError);

      dispatch(clearErrors());
    }

    if (success) {
      notify("Review Added Successfully")

      dispatch({ type: NEW_REVIEWS_RESETSS });
    }
  }, [dispatch, error, reviewError, id, success]);

  // const increaseQty = () => {
  //   const count = document.querySelector(".count");

  //   if (count.valueAsNumber >= service.stock) return;

  //   const qty = count.valueAsNumber + 1;

  //   setQuantity(qty);
  // };

  // const decreaseQty = () => {
  //   const count = document.querySelector(".count");

  //   if (count.valueAsNumber <= 1) return;

  //   const qty = count.valueAsNumber - 1;

  //   setQuantity(qty);
  // };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandlers = () => {
    const formData = new FormData();

    formData.set("rating", rating);

    formData.set("comment", comment);

    formData.set("serviceId", id);

    dispatch(newReviews(formData));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header /><br /><br /><br /><br />
          <div class="container">
            <MetaData title={service.name} />

            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="service_image">
                <Carousel pause="hover">
                  {service.images &&
                    service.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                        <img
                          className="d-block w-100"
                          src={image.url}
                          alt={service.title}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-1">
                <h3>{service.name}</h3>

                <p id="service_id">Service # {service._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(service.ratings / 5) * 100}%` }}
                  ></div>
                </div>

                <span id="no_of_reviews">({service.numOfReviews} Reviews)</span>

                <hr />

                <p id="service_price">${service.price}</p>

                {/* <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span>
                </div> */}

                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled={service.stock === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                {/* <hr /> */}

                {/* <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={service.stock > 0 ? "greenColor" : "redColor"}
                  >
                    {service.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p> */}

                <hr />

                <h4 className="mt-2">Description:</h4>

                <p>{service.description}</p>

                {/* <hr />

                <p id="service_seller mb-3">
                  Sold by: <strong>{service.seller}</strong>
                </p> */}

                {user ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    onClick={setUserRatings}
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login to post your review.
                  </div>
                )}

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <button
                              className="btn my-3 float-right review-btn px-4 text-white"
                              onClick={reviewHandlers}
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {service.reviews && service.reviews.length > 0 && (
              <ListServiceReviews reviews={service.reviews} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ServiceDetails;

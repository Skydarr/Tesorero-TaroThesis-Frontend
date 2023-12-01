import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Header from "../layout/Header";

const OrderSuccess = () => {
  return (
    <Fragment>
      <Header /><br/><br/>
      <div class="container">
        <MetaData title={"Order Success"} />

        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <img
              className="my-5 img-fluid d-block mx-auto"
              src="/images/ordersuccess.gif"
              alt="Order Success"
              width="200"
              height="200"
            />

            <h2>The Service will be there soon.</h2>

            {/* <Link to="/ordersservice/me">Go to Orders</Link> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";
import Header from "../layout/Header";

import { useDispatch, useSelector } from "react-redux";

import { myOrderss, clearErrors } from "../../actions/orderServiceActions";

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrderss);

  useEffect(() => {
    dispatch(myOrderss());

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",

          field: "id",

          sort: "asc",
        },
        {
          label: "Item Name",

          field: "name",

          sort: "asc",
        },

        {
          label: "Num of Items",

          field: "numOfItems",

          sort: "asc",
        },

        {
          label: "Amount",

          field: "amount",

          sort: "asc",
        },

        {
          label: "Status",

          field: "status",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",

          sort: "asc",
        },
      ],

      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,

        name: order.orderItems[0].name,

        numOfItems: order.orderItems.length,

        amount: `$${order.totalPrice}`,

        status:
          order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),

        actions: (
          <Link to={`/orderservice/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <Header /><br/><br/><br/>
      <div class="container">
        <MetaData title={"My Orders"} />

        <h1 className="my-5">My Orders</h1>

        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
            noBottomColumns
          />
        )}
      </div>
    </Fragment>
  );
};

export default ListOrders;

import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { jsPDF, setFontStyle, setTextColor } from "jspdf";
import * as autoTable from 'jspdf-autotable'

import {
    getOrderDetails,
    updateOrder,
    clearErrors,
} from "../../actions/orderActions";

import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();

    let { id } = useParams();

    const { loading, order = {} } = useSelector((state) => state.orderDetails);

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalPrice,
        orderStatus,
    } = order;

    const { error, isUpdated } = useSelector((state) => state.order);

    const orderId = id;

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        dispatch(getOrderDetails(orderId));

        if (error) {
            errMsg(error);

            dispatch(clearErrors());
        }

        if (isUpdated) {
            // generateReceipt();
            successMsg("Order updated successfully");
            // generateReceipt();
            dispatch({ type: UPDATE_ORDER_RESET });
        }
    }, [dispatch, error, isUpdated, orderId]);

    const updateOrderHandler = (id) => {
        const formData = new FormData();

        formData.set("status", status);

        dispatch(updateOrder(id, formData));
    };

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

    const isPaid =
        paymentInfo && paymentInfo.status === "succeeded" ? true : false;

    const generateInvoice = () => {
        const doc = new jsPDF();

        //Header
        // doc.addImage("/images/Banner.png", "PNG", 10, 10, 190, 25);
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold')
        doc.text(`INVOICE`, 128, 23);

        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.text(`Invoice No: ${order._id}`, 128, 28);

        const invoiceHeaders = [["Product Name", "Quantity", "Price"]];
        const invoiceData = orderItems.map((item) => [
            item.name,
            item.quantity,
            `$${item.price}.00`,
        ]);

        //Customer Details
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        doc.text(`INVOICE TO`, 15, 50);

        doc.setFont(undefined, 'plain')
        doc.setFontSize(15);
        doc.text(`Customer Name:     ${user && user.name}`, 20, 60);
        doc.text(`Contact Number:    ${shippingInfo.phoneNo}`, 20, 65);
        doc.text(`Address:               ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`, 20, 70);
        doc.text(`Amount to be Paid: $${totalPrice}`, 20, 75);
        doc.setLineWidth(1);
        doc.setDrawColor(103, 86, 140);
        doc.line(10, 80, 200, 80);

        doc.setFont(undefined, 'bold')
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        doc.text(`ORDER DETAILS`, 80, 90);

        //Table Design
        doc.autoTable({
            startY: 100,
            head: invoiceHeaders,
            body: invoiceData,
            styles: { halign: 'center' },
            headStyles: { fillColor: [103, 86, 140] },
            alternateRowStyles: { fillColor: [231, 215, 252] },
            tableLineColor: [124, 95, 240],
            tableLineWidth: 0.1,
        });

        //Footer
        doc.setLineWidth(1);
        doc.setDrawColor(103, 86, 140);
        doc.line(10, 280, 200, 280);
        doc.setFont(undefined, 'plain');
        doc.setFontSize(15);
        doc.text('Thank you for purchasing! Please come again! ', 55, 285)

        // Save the PDF document
        doc.save('LapOnTheTop-Order# ' + `${order && order._id}` + '.pdf');
    };

    return (
        <Fragment>
            <br /><br /><br />
            <MetaData title={`Process Order # ${order && order._id}`} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">
                                    <h2 className="my-5">Order # {order._id}</h2>

                                    <h4 className="mb-4">Shipping Info</h4>

                                    <p>
                                        <b>Name:</b> {user && user.name}
                                    </p>

                                    <p>
                                        <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                                    </p>

                                    <p className="mb-4">
                                        <b>Address:</b>
                                        {shippingDetails}
                                    </p>

                                    <p>
                                        <b>Amount:</b> ${totalPrice}
                                    </p>

                                    <hr />

                                    <h4 className="my-4">Payment</h4>

                                    <p className={isPaid ? "greenColor" : "redColor"}>
                                        <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                                    </p>

                                    <h4 className="my-4">Stripe ID</h4>

                                    <p>
                                        <b>{paymentInfo && paymentInfo.id}</b>
                                    </p>

                                    <h4 className="my-4">Order Status:</h4>

                                    <p
                                        className={
                                            order.orderStatus &&
                                                String(order.orderStatus).includes("Delivered")
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        <b>{orderStatus}</b>
                                    </p>

                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />

                                    <div className="cart-item my-1">
                                        {orderItems &&
                                            orderItems.map((item) => (
                                                <div key={item.product} className="row my-5">
                                                    <div className="col-4 col-lg-2">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            height="45"
                                                            width="65"
                                                        />
                                                    </div>

                                                    <div className="col-5 col-lg-5">
                                                        <Link to={`/products/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </div>

                                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                        <p>${item.price}</p>
                                                    </div>

                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <p>{item.quantity} Piece(s)</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>

                                            <option value="Shipped">Shipped</option>

                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => updateOrderHandler(order._id)}
                                    >
                                        Update Status
                                    </button>

                                    <button className="btn btn-success btn-block"
                                        onClick={generateInvoice}
                                    >
                                        Print Receipt
                                    </button>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
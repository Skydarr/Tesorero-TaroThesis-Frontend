import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-bootstrap";
import { Box, Typography, Button, Divider } from '@mui/material';

import {
    getAdminServices,
    clearErrors,
    deleteService,
} from "../../actions/serviceActions";

import { DELETE_SERVICE_RESET } from "../../constants/serviceConstants";
import { color } from "@mui/system";

const ServiceList = () => {
    const dispatch = useDispatch();

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

    let navigate = useNavigate();

    const { loading, error, services } = useSelector((state) => state.services);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.service
    );

    useEffect(() => {
        dispatch(getAdminServices());

        if (error) {
            notify(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            notify(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            notify("Services deleted successfully");
            navigate("/services");
            dispatch({ type: DELETE_SERVICE_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    if (services) {
        services.forEach((service) => {
            console.log(service);
        });
    } else {
        console.log("service is undefined");
    }

    const setServices = () => {
        const data = {
            columns: [
                {
                    label: "Service ID",
                    field: "id",
                    sort: "asc",
                },

                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },

                {
                    label: "Price",
                    field: "price",
                    sort: "asc",
                },

                {
                    label: "Image",
                    field: "image",
                    sort: "asc",
                },

                {
                    label: "Actions",
                    field: "actions",
                },
            ],

            rows: [],
        };

        services.forEach((service) => {
            data.rows.push({
                id: service._id,

                name: service.name,

                price: `$${service.price}`,

                image: (
                    <Fragment>
                        <Carousel pause="hover">
                            {service.images &&
                                service.images.map((image) => (
                                    <Carousel.Item key={image.public_id}>
                                        <img
                                            className="d-block w-100"
                                            src={image.url}
                                            alt={service.title}
                                            width="10px"
                                            height={"100px"}
                                        />
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </Fragment>
                ),

                actions: (
                    <Fragment>
                        <Link
                            to={`/update/service/${service._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>

                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteServiceHandler(service._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteServiceHandler = (id) => {
        dispatch(deleteService(id));
    };

    return (

        <Box sx={{ height: 730, width: "90%", paddingTop: 5 }} backgroundColor="#f4effc">
            {/* <Typography variant="h3">Products</Typography> */}
            <Fragment>
                <MetaData title={"All Services"} />

                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        <br /><br />
                        {/* <img src="/images/services-banner.gif" width="auto" /><br/> */}
                        <h1>Services</h1>
                        <hr
                            style={{
                                color: "#2f3c4c",
                                backgroundColor: "#2f3c4c",
                                height: 5
                            }}
                        />
                        <Button size="large" variant="contained" color="primary"
                            sx={{ marginBottom: 2 }} href="/service/new"> New Service</Button>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setServices()}
                                className="px-3"
                                bordered
                                striped
                                hover
                                noBottomColumns
                            />
                        )}
                    </div>
                </div>
            </Fragment>
        </Box >
    );
};

export default ServiceList;
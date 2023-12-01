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
    getAdminProducts,
    clearErrors,
    deleteProduct,
} from "../../actions/productActions";

import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { color } from "@mui/system";

const ProductsList = () => {
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

    const { loading, error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            notify(error);

            dispatch(clearErrors());
        }

        if (deleteError) {
            notify(deleteError);

            dispatch(clearErrors());
        }

        if (isDeleted) {
            notify("Product deleted successfully");

            navigate("/admin/products");

            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "Product ID",
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
                    label: "Stock",
                    field: "stock",
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

        products.forEach((product) => {
            data.rows.push({
                id: product._id,

                name: product.name,

                price: `$${product.price}`,

                stock: product.stock,

                image: (
                    <Fragment>
                        <Carousel pause="hover">
                            {product.images &&
                                product.images.map((image) => (
                                    <Carousel.Item key={image.public_id}>
                                        <img
                                            className="d-block w-100"
                                            src={image.url}
                                            alt={product.title}
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
                            to={`/update/product/${product._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>

                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteProductHandler(product._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    return (

        <Box sx={{ height: 730, width: "90%", paddingTop: 5 }} backgroundColor="#f4effc">
            {/* <Typography variant="h3">Products</Typography> */}
            <Fragment>
                <MetaData title={"All Products"} />

                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        {/* <h1 style={{ paddingTop: 60 }}>All Products</h1> */}
                        <br /><br />
                        {/* <img src="/images/products-banner.gif" width="auto" /><br/> */}
                        <h1>Products</h1>
                        <hr
                            style={{
                                color: "#2f3c4c",
                                backgroundColor: "#2f3c4c",
                                height: 5
                            }}
                        />
                        <Button size="large" variant="contained" color="primary"
                            sx={{ marginBottom: 2 }} href="/product/new"> New Product</Button>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setProducts()}
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

export default ProductsList;
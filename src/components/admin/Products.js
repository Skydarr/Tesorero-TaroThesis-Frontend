import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Product from "../product/Product";
import Loader from "../layout/Loader";
// import Header from "./layout/Header";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productActions";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { Grid } from "@mui/material";

const Products = ({ match }) => {
    const dispatch = useDispatch();

    const {
        loading,
        products,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const [dataSource, setDataSource] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loadedItems, setLoadedItems] = useState(0);

    useEffect(() => {
        setDataSource(products.slice(0, loadedItems + 3));
        setLoadedItems(loadedItems + 3);
    }, [products, loadedItems]);

    const fetchMoreData = () => {
        if (dataSource.length < products.length) {
            setTimeout(() => {
                const newData = products.slice(0, dataSource.length + 3);
                setDataSource(newData);
            }, 500);
        } else {
            setHasMore(dataSource.length < products.length);
        }
    };

    return (
        <Fragment>
            <div className="container">
                <MetaData title={"Buy Best Products Online"} />
                <div className="row"></div>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h1 id="products_heading" style={{ textAlign: "center" }}>
                            <span> Available Products & Accessories</span>
                        </h1>
                        <InfiniteScroll
                            dataLength={loadedItems}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<p>Loading...</p>}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            <Grid>
                                {dataSource.map((product) => (
                                    <Product key={product._id} product={product} col={4} />
                                ))}
                            </Grid>
                        </InfiniteScroll>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default Products;
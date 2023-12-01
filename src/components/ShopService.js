import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Service from "./services/Service";
import Loader from "./layout/Loader";
import Header from "./layout/Header";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../actions/serviceActions";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import InfiniteScroll from 'react-infinite-scroll-component';
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { Grid } from "@mui/material";

//

const ShopService = ({ match }) => {
    const dispatch = useDispatch();

    const createSliderWithToolTip = Slider.createSliderWithToolTip;
    const Range = createSliderWithTooltip(Slider.Range);
    const [price, setPrice] = useState([1, 1000]);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        loading,
        services,
        error,
        servicesCount,
        resPerPage,
        filteredServicesCount,
    } = useSelector((state) => state.services);

    console.log(services);
    let { keyword } = useParams();

    useEffect(() => {
        dispatch(getServices(keyword, currentPage, price));
        if (error) {
            return alert.error(error);
        }
    }, [dispatch, alert, error, keyword, price, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = servicesCount;
    if (keyword) {
        count = filteredServicesCount;
    }

    console.log(keyword);

    const Serv = services.slice(0, 3)
    console.log(Serv)
    const [dataSource, setDataSource] = useState(Serv);
    const [hasMore, setHasMore] = useState(false);

    console.log(services.slice(0, 3))

    const fetchMoreData = () => {
        if (dataSource.length <= services.length) {
            setTimeout(() => {
                setHasMore(true)
                const newData = services.slice(0, dataSource.length + 3);
                setDataSource(newData);
            }, 500);
        } else {
            setHasMore(false);
        }
    };

    console.log(hasMore)
    console.log(dataSource.length)

    return (
        <Fragment>
            <Header /><br /><br /><br />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <InfiniteScroll
                        dataLength={dataSource.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<p>Loading...</p>}
                        endMessage={<p>You have reach the end</p>}
                    >
                        <Grid>
                            <MetaData title={"Buy Best Services Online"} />
                            <h1 id="products_heading" style={{ textAlign: "center" }}><span> Available Services</span></h1>
                            <section id="services" className="container mt-5">
                                {dataSource.map((service) => (
                                    <Service key={service._id} service={service} />
                                ))}
                            </section>
                        </Grid>
                    </InfiniteScroll>

                    <section id="services" className="container mt-5">
                        {/* <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div> */}
                        <div className="row">
                            {/* {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`,
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={(value) => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true,
                                                }}
                                                value={price}
                                                onChange={(price) => setPrice(price)}
                                            />
                                            <hr className="my-5" />
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                services && services.map((service) => (
                                    <Service key={service._id} service={service} col={3} />
                                ))

                            )} */}
                        </div>
                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={servicesCount}
                                onChange={setCurrentPageNo}
                                nextPageText={"Next"}
                                prevPageText={"Prev"}
                                firstPageText={"First"}
                                lastPageText={"Last"}
                                itemClass="page-item"
                                linkClass="page-link"
                            />

                        </div>


                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ShopService;

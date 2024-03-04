import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Disease from "./diseases/Disease";
import Loader from "./layout/Loader";
import Header from "./layout/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiseases } from "../actions/diseaseAction";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import InfiniteScroll from 'react-infinite-scroll-component';
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { Grid } from "@mui/material";

const TaroDiseases = ({ match }) => {
    const dispatch = useDispatch();
    // const [price, setPrice] = useState([1, 1000]);
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, disease, error, diseaseCount, resPerPage, filteredDiseasesCount } = useSelector((state) => state.disease || {});

    let { keyword } = useParams();

    useEffect(() => {
        dispatch(getDiseases(keyword, currentPage));
        if (error) {
            alert.error(error);
        }
    }, [dispatch, error, keyword, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    if (loading || !disease) {
        return <Loader />;
    }

    let count = diseaseCount;
    if (keyword) {
        count = filteredDiseasesCount;
    }

    console.log(keyword);

    const Serv = disease.slice(0, 3);
    const [dataSource, setDataSource] = useState(Serv);
    const [hasMore, setHasMore] = useState(false);

    const fetchMoreData = () => {
        if (dataSource.length <= disease.length) {
            setTimeout(() => {
                setHasMore(true)
                const newData = disease.slice(0, dataSource.length + 3);
                setDataSource(newData);
            }, 500);
        } else {
            setHasMore(false);
        }
    };

    return (
        <Fragment>
            <Header /><br /><br /><br />
            <Fragment>
                <InfiniteScroll
                    dataLength={dataSource.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<p>Loading...</p>}
                    endMessage={<p>You have reached the end</p>}
                >
                    <Grid>
                        <MetaData title={"Learn about Taro Diseases"} />
                        <h1 id="products_heading" style={{ textAlign: "center" }}><span> Taro Diseases </span></h1>
                        <section id="services" className="container mt-5">
                            {dataSource.map((disease) => (
                                <Disease key={disease._id} disease={disease} />
                            ))}
                        </section>
                    </Grid>
                </InfiniteScroll>

                {resPerPage <= count && (
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={diseaseCount}
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
        </Fragment>
    );
};

export default TaroDiseases;

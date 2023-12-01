import axios from "axios";

import {
    CREATE_ORDER_REQUESTS,
    CREATE_ORDER_SUCCESSS,
    CREATE_ORDER_FAILS,
    CLEAR_ERRORSS,
    MY_ORDERS_REQUESTS,
    MY_ORDERS_SUCCESSS,
    MY_ORDERS_FAILS,
    ORDER_DETAILS_REQUESTS,
    ORDER_DETAILS_SUCCESSS,
    ORDER_DETAILS_FAILS,
    ALL_ORDERS_REQUESTS,
    ALL_ORDERS_SUCCESSS,
    ALL_ORDERS_FAILS,
    UPDATE_ORDER_SUCCESSS,
    UPDATE_ORDER_REQUESTS,
    UPDATE_ORDER_FAILS,
    DELETE_ORDER_REQUESTS,
    DELETE_ORDER_SUCCESSS,
    DELETE_ORDER_RESETSS,
    DELETE_ORDER_FAILS,
} from "../constants/orderServiceConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUESTS });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("/api/v1/order/new", order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESSS,

            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILS,

            payload: error.response.data.message,
        });
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUESTS });

        const { data } = await axios.get("/api/v1/orders/me");

        dispatch({
            type: MY_ORDERS_SUCCESSS,

            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAILS,

            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORSS,
    });
};

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUESTS });

        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESSS,

            payload: data.order,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILS,

            payload: error.response.data.message,
        });
    }
};

export const allOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUESTS });

        const { data } = await axios.get(`/api/v1/admin/orders`);

        dispatch({
            type: ALL_ORDERS_SUCCESSS,

            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAILS,

            payload: error.response.data.message,
        });
    }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUESTS });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/v1/admin/order/${id}`,
            orderData,
            config
        );

        dispatch({
            type: UPDATE_ORDER_SUCCESSS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAILS,

            payload: error.response.data.message,
        });
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUESTS });

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({
            type: DELETE_ORDER_SUCCESSS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAILS,

            payload: error.response.data.message,
        });
    }
};

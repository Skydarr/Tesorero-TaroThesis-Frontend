import axios from 'axios'
import {
    MONTHLY_SALES_REQUEST,
    MONTHLY_SALES_SUCCESS,
    MONTHLY_SALES_FAIL,
    PRODUCT_COUNT_REQUEST,
    PRODUCT_COUNT_SUCCESS,
    PRODUCT_COUNT_FAIL,
    CLEAR_ERRORS
} from '../constants/chartConstants'

export const monthlySalesChart = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
        dispatch({ type: MONTHLY_SALES_REQUEST })
        const { data } = await axios.get(`/api/v1/orders/sales-per-month`, config)
        dispatch({
            type: MONTHLY_SALES_SUCCESS,
            payload: data.salesPerMonth,
        })
    } catch (error) {
        dispatch({
            type: MONTHLY_SALES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const productCountChart = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
        dispatch({ type: PRODUCT_COUNT_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/productschart/stock`, config)
        dispatch({
            type: PRODUCT_COUNT_SUCCESS,
            payload: data.productStock,
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type: PRODUCT_COUNT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}
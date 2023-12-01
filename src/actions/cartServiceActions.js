import axios from "axios";

import {
    ADD_TO_CARTS,
    REMOVE_ITEM_CARTS,
    SAVE_SHIPPING_INFOS,
    CLEAR_CARTS,
} from "../constants/cartServiceConstants";

export const addItemToCarts = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/service/${id}`);

    dispatch({
        type: ADD_TO_CARTS,

        payload: {
            service: data.service._id,

            name: data.service.name,

            price: data.service.price,

            image: data.service.images[0].url,

            // stock: data.service.stock,

            // quantity,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CARTS,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfos = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFOS,
        payload: data,
    });

    localStorage.setItem("shippingInfos", JSON.stringify(data));
};

export const clearCart = () => async (dispatch) => {
    dispatch({
        type: CLEAR_CARTS,
    });
};

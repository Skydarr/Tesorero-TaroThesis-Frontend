import {
    CREATE_ORDER_REQUESTS,
    CREATE_ORDER_SUCCESSS,
    CREATE_ORDER_FAILS,
    CLEAR_ERRORS,
    MY_ORDERS_REQUESTS,
    MY_ORDERS_SUCCESSS,
    MY_ORDERS_FAILS,
    ORDER_DETAILS_REQUESTS,
    ORDER_DETAILS_SUCCESSS,
    ORDER_DETAILS_FAILS,
    ALL_ORDERS_REQUESTS,
    ALL_ORDERS_SUCCESSS,
    ALL_ORDERS_FAILS,
    UPDATE_ORDER_REQUESTS,
    UPDATE_ORDER_SUCCESSS,
    UPDATE_ORDER_RESETS,
    UPDATE_ORDER_FAILSS,
    DELETE_ORDER_REQUESTS,
    DELETE_ORDER_SUCCESSS,
    DELETE_ORDER_RESETS,
    DELETE_ORDER_FAILSS,
} from "../constants/orderServiceConstants";

export const newOrderReducers = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUESTS:
            return {
                ...state,

                loading: true,
            };

        case CREATE_ORDER_SUCCESSS:
            return {
                loading: false,

                order: action.payload,
            };

        case CREATE_ORDER_FAILS:
            return {
                loading: false,

                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,

                error: null,
            };

        default:
            return state;
    }
};

export const myOrdersReducers = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUESTS:
            return {
                loading: true,
            };

        case MY_ORDERS_SUCCESSS:
            return {
                loading: false,

                orders: action.payload,
            };

        case MY_ORDERS_FAILS:
            return {
                loading: false,

                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,

                error: null,
            };

        default:
            return state;
    }
};

export const orderDetailsReducers = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUESTS:
            return {
                loading: true,
            };

        case ORDER_DETAILS_SUCCESSS:
            return {
                loading: false,

                order: action.payload,
            };

        case ORDER_DETAILS_FAILS:
            return {
                loading: false,

                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,

                error: null,
            };

        default:
            return state;
    }
};

export const allOrdersReducers = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUESTS:
            return {
                loading: true,
            };

        case ALL_ORDERS_SUCCESSS:
            return {
                loading: false,

                orders: action.payload.orders,

                totalAmount: action.payload.totalAmount,
            };

        case ALL_ORDERS_FAILS:
            return {
                loading: false,

                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,

                error: null,
            };

        default:
            return state;
    }
};

export const orderReducers = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUESTS:
        case DELETE_ORDER_REQUESTS:
            return {
                ...state,

                loading: true,
            };

        case UPDATE_ORDER_SUCCESSS:
            return {
                ...state,

                loading: false,

                isUpdated: action.payload,
            };

        case DELETE_ORDER_SUCCESSS:
            return {
                ...state,

                loading: false,

                isDeleted: action.payload,
            };

        case UPDATE_ORDER_FAILSS:
        case DELETE_ORDER_FAILSS:
            return {
                ...state,

                error: action.payload,
            };

        case UPDATE_ORDER_RESETS:
            return {
                ...state,

                isUpdated: false,
            };

        case DELETE_ORDER_RESETS:
            return {
                ...state,

                isDeleted: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,

                error: null,
            };

        default:
            return state;
    }
};

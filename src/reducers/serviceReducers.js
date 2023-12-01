import {
    ALL_SERVICES_REQUEST,
    ALL_SERVICES_SUCCESS,
    ALL_SERVICES_FAIL,
    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEWS_REQUESTS,
    NEW_REVIEWS_SUCCESSS,
    NEW_REVIEWS_RESETSS,
    NEW_REVIEWS_FAILS,
    ADMIN_SERVICES_REQUEST,
    ADMIN_SERVICES_SUCCESS,
    ADMIN_SERVICES_FAIL,
    NEW_SERVICE_REQUEST,
    NEW_SERVICE_SUCCESS,
    NEW_SERVICE_RESET,
    NEW_SERVICE_FAIL,
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_RESET,
    DELETE_SERVICE_FAIL,
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_RESET,
    UPDATE_SERVICE_FAIL,
    GET_REVIEWS_REQUESTS,
    GET_REVIEWS_SUCCESSS,
    GET_REVIEWS_FAILS,
    DELETE_REVIEWS_REQUESTS,
    DELETE_REVIEWS_SUCCESSS,
    DELETE_REVIEWS_RESETS,
    DELETE_REVIEWS_FAILS,
} from "../constants/serviceConstants";

export const servicesReducer = (state = { services: [] }, action) => {
    switch (action.type) {
        case ALL_SERVICES_REQUEST:
        case ADMIN_SERVICES_REQUEST:
            return {
                loading: true,
                services: [],
            };

        case ALL_SERVICES_SUCCESS:
            return {
                loading: false,
                services: action.payload.services,
                servicesCount: action.payload.servicesCount,
                resPerPage: action.payload.resPerPage,
                filteredServicesCount: action.payload.filteredServicesCount,
            };

        case ADMIN_SERVICES_SUCCESS:
            return {
                loading: false,
                services: action.payload,
            };

        case ALL_SERVICES_FAIL:
        case ADMIN_SERVICES_FAIL:
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

export const newServiceReducer = (state = { service: {} }, action) => {
    switch (action.type) {
        case NEW_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_SERVICE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                service: action.payload.service,
            };

        case NEW_SERVICE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_SERVICE_RESET:
            return {
                ...state,
                success: false,
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

export const serviceReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SERVICE_REQUEST:
        case UPDATE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_SERVICE_FAIL:
        case UPDATE_SERVICE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_SERVICE_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_SERVICE_RESET:
            return {
                ...state,
                isUpdated: false,
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

export const serviceDetailsReducer = (state = { service: {} }, action) => {
    switch (action.type) {
        case SERVICE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SERVICE_DETAILS_SUCCESS:
            return {
                loading: false,
                service: action.payload,
            };

        case SERVICE_DETAILS_FAIL:
            return {
                ...state,
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

export const newReviewsReducers = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEWS_REQUESTS:
            return {
                ...state,
                loading: true,
            };

        case NEW_REVIEWS_SUCCESSS:
            return {
                loading: false,
                success: action.payload,
            };

        case NEW_REVIEWS_FAILS:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_REVIEWS_RESETSS:
            return {
                ...state,
                success: false,
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

export const serviceReviewsReducers = (state = { review: [] }, action) => {
    switch (action.type) {
        case GET_REVIEWS_REQUESTS:
            return {
                ...state,
                loading: true,
            };

        case GET_REVIEWS_SUCCESSS:
            return {
                loading: false,
                reviews: action.payload,
            };

        case GET_REVIEWS_FAILS:
            return {
                ...state,
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

export const reviewsReducers = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEWS_REQUESTS:
            return {
                ...state,
                loading: true,
            };

        case DELETE_REVIEWS_SUCCESSS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case DELETE_REVIEWS_FAILS:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_REVIEWS_RESETS:
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
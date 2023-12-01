import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
    customerSalesReducer
} from "./reducers/userReducers";

import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productReducer,
    reviewReducer,
    productReviewsReducer,
} from "./reducers/productReducers";

import {
    servicesReducer,
    newServiceReducer,
    serviceReducer,
    serviceDetailsReducer,
    newReviewsReducers,
    serviceReviewsReducers,
    reviewsReducers
} from "./reducers/serviceReducers";

import { salesPerMonthReducer, productCountReducer } from './reducers/chartReducers';

//Service Cart
import { cartServiceReducers } from "./reducers/cartServiceReducers";

import {
    newOrderReducers,
    myOrdersReducers,
    orderDetailsReducers,
    allOrdersReducers,
    orderReducers,
} from "./reducers/orderServiceReducer";

//Product Cart
import { cartReducer } from "./reducers/cartReducers";

import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer,
} from "./reducers/orderReducers";

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],

        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
    carts: {
        cartItemss: localStorage.getItem("cartItemss")
            ? JSON.parse(localStorage.getItem("cartItemss"))
            : [],

        shippingInfos: localStorage.getItem("shippingInfos")
            ? JSON.parse(localStorage.getItem("shippingInfos"))
            : {},
    },
};

const reducer = combineReducers({
    //User
    auth: authReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,
    customerSales: customerSalesReducer,

    //Product Reducer
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    product: productReducer,

    //Service Reducer
    services: servicesReducer,
    serviceDetails: serviceDetailsReducer,
    newReviews: newReviewsReducers,
    newService: newServiceReducer,
    serviceReviewss: serviceReviewsReducers,
    reviewss: reviewsReducers,
    service: serviceReducer,

    //Cart Reducer 
    cart: cartReducer,

    //Order Reducer
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,

    //Service-Cart Reducer 
    carts: cartServiceReducers,

    //Service-Order Reducer
    newOrders: newOrderReducers,
    myOrderss: myOrdersReducers,
    orderDetailss: orderDetailsReducers,
    allOrderss: allOrdersReducers,
    orders: orderReducers,

    //Charts Reducer
    salesPerMonth: salesPerMonthReducer,
    productCount: productCountReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
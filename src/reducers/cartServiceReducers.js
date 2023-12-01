import {
    ADD_TO_CARTS,
    REMOVE_ITEM_CARTS,
    SAVE_SHIPPING_INFOS,
    CLEAR_CARTS,
} from "../constants/cartServiceConstants";

export const cartServiceReducers = (
    state = { cartItemss: [], shippingInfos: {} },
    action
) => {
    // console.log(state.cartItems);

    switch (action.type) {
        case ADD_TO_CARTS:
            const item = action.payload;

            const isItemExist = state.cartItemss.find(
                (i) => i.service === item.service
            );

            if (isItemExist) {
                return {
                    ...state,

                    cartItemss: state.cartItemss.map((i) =>
                        i.service === isItemExist.service ? item : i
                    ),
                };
            } else {
                return {
                    ...state,

                    cartItemss: [...state.cartItemss, item],
                };
            }

        case REMOVE_ITEM_CARTS:
            return {
                ...state,

                cartItemss: state.cartItemss.filter((i) => i.service !== action.payload),
            };

        case SAVE_SHIPPING_INFOS:
            return {
                ...state,

                shippingInfos: action.payload,
            };

        case CLEAR_CARTS:
            return {
                ...state,
                cartItemss: [],
            };

        default:
            return state;
    }
};
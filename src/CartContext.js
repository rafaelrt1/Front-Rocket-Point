import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const themeReducer = (state, action) => {
    return { cartItemsQntd: action.cartQntd };
};

const getInitialState = () => {
    try {
        let ls = localStorage.getItem("products");
        if (!ls)
            return { cartItemsQntd: 0 };
        else {
            ls = JSON.parse(ls);
            let totalItemsOnCart = 0;

            ls.map(function (item) {
                return totalItemsOnCart += item.qntd;
            })
            return {
                cartItemsQntd: totalItemsOnCart
            };
        }
    }
    catch (e) {
        console.error(e);
    }
}

export function ThemeProvider(props) {
    const [state, dispatch] = useReducer(themeReducer, getInitialState());

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CartContext.Provider>
    );
}
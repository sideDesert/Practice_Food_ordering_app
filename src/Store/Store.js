//the application wide state management
import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: ()=>{},
    removeItem: ()=>{},
    incrementItem: ()=>{},
    clearCart: ()=>{}
});



export default CartContext;
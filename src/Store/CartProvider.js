import CartContext from "./Store"
import React, { useReducer } from "react";


const defaultCartState = {
    items: [],
    totalAmount: 0
} 

const cartReducer = (state, action)=>{
    if(action.type === "ADD"){
        

        const existingItemIndex = state.items.findIndex(item=> item.id === action.item.id);
        const existingCartItem = state.items[existingItemIndex];
        let updatedItem;
        let updatedItems = []

        if(existingCartItem){
            updatedItem = {
              ...existingCartItem,
              amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItem = {...action.item};
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === "REMOVE"){
        let selectedItemIndex = state.items.findIndex((item)=> item.id === action.id);
        let selectedItem = state.items[selectedItemIndex];
        let updatedCartItem = {...selectedItem};
        updatedCartItem.amount -= 1;

        let updatedCartItems = [...state.items];
        updatedCartItems[selectedItemIndex] = updatedCartItem;

        const updatedTotalAmount = state.totalAmount - selectedItem.price;

        if(updatedCartItem.amount === 0){
            updatedCartItems = updatedCartItems.filter((item)=>{return item.amount !== 0});
        }
        return{
            items: updatedCartItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type ==="INCREMENT"){
        
        let updatedItems;
        let updatedTotalAmount;
        let existingItemIndex = state.items.findIndex(item=> item.id === action.item.id);
        let existingCartItem = state.items[existingItemIndex];

        let updatedCartItem = {...existingCartItem, amount: existingCartItem.amount + 1}
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedCartItem;
        updatedTotalAmount = state.totalAmount + updatedCartItem.price;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === "CLEAR"){
        return defaultCartState;
    }
}

const CartProvider = (props)=>{

    const [cartState, dispatchCardAction] = useReducer(cartReducer, defaultCartState );

    const addItemToCartHandler = (item)=>{
        dispatchCardAction({type: "ADD", item: item});
    }
    const removeItemFromCartHandler = (id)=>{
        dispatchCardAction({type: "REMOVE", id: id})
    }
    const incrementItemHandler = (item)=>{
        dispatchCardAction({type: "INCREMENT", item: item});
    }
    const clearCartHandler = ()=>{
        dispatchCardAction({type: "CLEAR"});
    }
    let cartContext = {
        items :cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler, 
        removeItem : removeItemFromCartHandler,
        incrementItem: incrementItemHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value = {cartContext}>{props.children}</CartContext.Provider>;
}

export default CartProvider;
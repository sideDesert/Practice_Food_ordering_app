import classes from './Cart.module.css';
import Modal from '../UI/Modal'
import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../../Store/Store';
import CartItem from './CartItem';
import Checkout from './Checkout'

const Cart = (props)=>{
    //this block handles all the state functions
    const[checkout, setCheckout] = useState(false);
    const[orderPlaced, setOrderPlace] = useState(false);

    const context = useContext(CartContext);
    const itemZero = context.items.length === 0;
    //checks if the application needs to fall back to false of checkout state
    useEffect(()=>{
        if(itemZero){
            setCheckout(false);
        }
        if(orderPlaced){
            console.log('orderPlaced');
        }
        //setOrderPlace(false);
    },[itemZero,orderPlaced]);
    //this block handles all the functions required for stuff down in the return </jsx> place. The names descibe what the functions are intended to do
    const cartItemRemoveHandler = (id)=>{
        context.removeItem(id);
    }

    const cartItemAddHandler = (item)=>{
        context.incrementItem(item);
    }

    const proceedToCheckoutHandler = ()=>{
        setCheckout(true);
    }

    function cartClose(){
        props.onCartClose();
        setCheckout(false);
    }
    const checkoutHandler = (user_input)=>{
        
        fetch(
          "https://food-dilevery-app-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
          {
            method: "POST",
            body: JSON.stringify({
              user: user_input,
              orderedItems: context.items,
            }),
          }
        ).then(() => {
          context.clearCart();
          setOrderPlace(true);
          console.log(orderPlaced);
          setTimeout(()=>{setOrderPlace(false); cartClose()}, 3000)
          
        });

        
    }
    const cartItems = (
      <ul className={classes["cart-items"]}>
        {context.items.map((item) => (
          <CartItem key = {item.id} amount = {item.amount} name = {item.name} price = {item.price} onRemove = {cartItemRemoveHandler.bind(null, item.id)} onAdd = {cartItemAddHandler.bind(null, item)}/>
        ))}
      </ul>
    );

    const cartDisplayElement = (
      <React.Fragment>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount:</span>
          <span>{`$${context.totalAmount.toFixed(2)}`}</span>
        </div>
        {checkout && (
          <Checkout
            cancelHandler={cartClose}
            checkoutHandler={checkoutHandler}
          />
        )}
        <div className={classes.actions}>
          {!checkout && (
            <button className={classes["button--alt"]} onClick={cartClose}>
              Close
            </button>
          )}
          {!itemZero && !checkout && (
            <button
              className={classes.button}
              onClick={proceedToCheckoutHandler}
            >
              Order
            </button>
          )}
        </div>
      </React.Fragment>
    );
   
    return (
      <Modal>
        {orderPlaced ? <h2>Order Placed! you will go back to cart 3 seconds...</h2> : cartDisplayElement}
      </Modal>
    );
}

export default Cart;
import classes from './Cart.module.css';
import Modal from '../UI/Modal'
import { useContext } from 'react';
import CartContext from '../../Store/Store';
import CartItem from './CartItem';

const Cart = (props)=>{
    
    const context = useContext(CartContext);
    const itemZero = context.items.length === 0;
    const cartItemRemoveHandler = (id)=>{
        context.removeItem(id);
    }

    const cartItemAddHandler = (item)=>{
        context.incrementItem(item);
    }
    const cartItems = (
      <ul className={classes["cart-items"]}>
        {context.items.map((item) => (
          <CartItem key = {item.id} amount = {item.amount} name = {item.name} price = {item.price} onRemove = {cartItemRemoveHandler.bind(null, item.id)} onAdd = {cartItemAddHandler.bind(null, item)}/>
        ))}
      </ul>
    );
    function cartClose(){
        props.onCartClose();
    }
    return(
        <Modal>
            {cartItems}
            <div className = {classes.total}>
                <span>
                    Total Amount:
                </span>
                <span>{`$${context.totalAmount.toFixed(2)}`}</span>
            </div>
            <div className = {classes.actions}>
                <button className = {classes['button--alt']} onClick= {cartClose}>Close</button>
                {!itemZero && <button className = {classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;
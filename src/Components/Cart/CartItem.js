import classes from './CartItem.module.css';
import { useEffect, useState } from 'react';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const [limitReached, setLimit] = useState(false);
  useEffect(() => {
    if (props.amount >= 5) {
      setLimit(true);
    } else {
      setLimit(false);
    }
  }, [limitReached, props.amount]);

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        {!limitReached && <button onClick={props.onAdd}>+</button>}
        {limitReached && <button className={classes.disable}>+</button>}
      </div>
    </li>
  );
};

export default CartItem;

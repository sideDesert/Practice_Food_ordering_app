import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon.js'
import classes from './HeaderCardButton.module.css'
import CartContext from '../../Store/Store.js';

const HeaderCardButton = (props)=>{
    const context = useContext(CartContext);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const btnClasses = `${classes.button} ${buttonIsHighlighted && classes.bump}`
    
    useEffect(()=>{
        if(context.items.length === 0){
            return;
        }

        setButtonIsHighlighted(true);

        const timer = setTimeout(()=>{
            setButtonIsHighlighted(false);
        },300);

        return ()=>{
            clearTimeout(timer);
        }
    }, [context.items]);


    function cartShownHandler(){
        props.cartShown();
    }

    return (
      <button className={btnClasses} onClick={cartShownHandler}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
          {context.items.reduce((curr, item) => {
            return curr + item.amount;
          }, 0)}
        </span>
      </button>
    );
}

export default HeaderCardButton;
import React, { useRef }from "react"
import { useState } from "react";
import classes from './Checkout.module.css'
const Checkout = (props)=>{
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = (input)=>{
      return input.trim().length === 0;
    }
    const isFiveCharsOrMore = (input)=>{
      return input.trim().length >= 5;
    }
  
    //validity variables
    

    const [formIsValid, setFormIsValid] = useState(false);

    function changeHandler(){
      
      let nameIsValid = !isEmpty(nameInputRef.current.value);
      let streetIsValid = !isEmpty(streetInputRef.current.value);
      let postalIsValid = isFiveCharsOrMore(postalInputRef.current.value);
      let cityIsValid = !isEmpty(cityInputRef.current.value);
      
      setFormIsValid(nameIsValid&&streetIsValid&&postalIsValid&&cityIsValid);

    }
    function onCheckoutHandler(event){
      event.preventDefault();
      if (formIsValid) {
        props.checkoutHandler({
          name: nameInputRef.current.value,
          street: streetInputRef.current.value,
          postalCode: postalInputRef.current.value,
          city: cityInputRef.current.value,
        });
      } else {
        return;
      }
    }
    return (
      <form className = {classes.checkoutForm}>
        <div className = {classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref = {nameInputRef} onChange = {changeHandler}/>
        </div>
        <div className = {classes.control}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref = {streetInputRef} onChange = {changeHandler}/>
        </div>
        <div className = {classes.control}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref = {postalInputRef} onChange = {changeHandler}/>
        </div>
        <div className = {classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref = {cityInputRef} onChange = {changeHandler}/>
        </div>
        <span>
          <button type = "button" className = {classes.cancel_btn} onClick={props.cancelHandler}>Cancel</button>
          <button type = "submit" onClick ={onCheckoutHandler} className ={!formIsValid ? classes.unavailable : " "}>Confirm</button>
        </span>
      </form>
    );
}

export default Checkout
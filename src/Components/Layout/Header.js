import { Fragment } from "react";
import mealsImg from '../../Assets/Header_splash.jpg'
import HeaderCardButton from "./HeaderCardButton";
import classes from './Header.module.css'


const Header = (props) => {

  function cartShownHandler(){
    props.onCartShown();
  }

  return (
    <Fragment>
      <header className = {classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCardButton cartShown = {cartShownHandler}/>
      </header>
      <div className = {classes['main-image']}>
          <img src = {mealsImg} alt ='something tasty'/>
      </div>
    </Fragment>
  );
};

export default Header;

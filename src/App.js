import React, { Fragment, useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from './Components/Cart/Cart';
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartState, setCartState] = useState(false)

  function showCartHandler(){
    setCartState(true);
  }
  function hideCartHandler(){
    setCartState(false);
  }

  return (
    <CartProvider>
      <Fragment>
      {cartState && <Cart onCartClose = {hideCartHandler}/>}
        <Header onCartShown = {showCartHandler}/>
        <main>
          <Meals />
        </main>
      </Fragment>
    </CartProvider>
  );
}

export default App;

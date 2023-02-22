import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ManyProducts from "./components/ProductsAll";
import OneProduct from "./components/ProductOne";
import MyProducts from "./components/ProductsMy";
import ProductFormPage from "./components/ProductForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/products/new'>
            <ProductFormPage />
          </Route>
          <Route path='/products/:id'>
            <OneProduct />
          </Route>
          <Route path="/my-products">
            <MyProducts />
          </Route>
          <Route exact path="/">
            <ManyProducts />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

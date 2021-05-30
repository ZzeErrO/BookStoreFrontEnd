import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Link , Switch, Redirect} from 'react-router-dom';
import SignInSignUp from './pages/SignInAndSignUp';
import BookStore from './pages/BookStore';
import Cart from './pages/Cart';

function App() {
  //<Route path="*" component={() => "404 NOT FOUND"} />
  return (

    <BrowserRouter>
    <Switch>
      <Route exact path= "/loginOrSignUp" component={SignInSignUp} />
      <Route exact path= "/bookStore" component={BookStore} />
      <Route exact path= "/bookStore/cart" component={Cart} />
    </Switch>
  </BrowserRouter>

  );
}

export default App;

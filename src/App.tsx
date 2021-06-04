import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Link , Switch, Redirect} from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp/SignInAndSignUp';
import BookStore from './pages/BookStore/BookStore';
import Cart from './pages/Cart/Cart';
import WishList from './pages/WishList/WishList';
import NOTFOUND from './components/NOTFOUND/Notfound';
import OrderSuccess from './pages/OrderSuccessFul/OrderSuccess';

function App() {

  return (

    <BrowserRouter>
    <Switch>
      <Route exact path= "/loginOrSignUp" component={SignInSignUp} />
      <Route exact path= "/bookStore" component={BookStore} />
      <Route exact path= "/cart" component={Cart} />
      <Route exact path= "/wishlist" component={WishList} />
      <Route exact path= "/success" component={OrderSuccess} />
      <Route path="*" component={NOTFOUND} />
    </Switch>
  </BrowserRouter>

  );
}

export default App;

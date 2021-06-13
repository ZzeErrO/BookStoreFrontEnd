import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Link , Switch, Redirect} from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp/SignInAndSignUp';
import BookStore from './pages/BookStore/BookStore';
import Cart from './pages/Cart/Cart';
import WishList from './pages/WishList/WishList';
import Search from './pages/Search/Search';
import NOTFOUND from './components/NOTFOUND/Notfound';
import OrderSuccess from './pages/OrderSuccessFul/OrderSuccess';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {

  return (

    <BrowserRouter>
    <Switch>
      <Route exact path= "/loginOrSignUp" component={SignInSignUp} />

      <ProtectedRoute path= "/bookStore" component={BookStore} />
      <ProtectedRoute path= "/cart" component={Cart} />
      <ProtectedRoute path= "/wishlist" component={WishList} />
      <ProtectedRoute path= "/success" component={OrderSuccess} />
      <ProtectedRoute path= "/search" component={Search} />

      <Route path="*" component={NOTFOUND} />
    </Switch>
  </BrowserRouter>

  );
}

export default App;

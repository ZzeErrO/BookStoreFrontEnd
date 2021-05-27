import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import SignInSignUp from './pages/SignInAndSignUp';

function App() {
  return (
    <SignInSignUp/>
  );
}

export default App;

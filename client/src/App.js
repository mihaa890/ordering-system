import './App.css';
import React from 'react';
import {Component} from 'react';
import { BrowserRouter,
  Routes,
  Route } from 'react-router-dom';
import {Login} from './account/Login';
import {Register} from './account/Register';
import {Home} from './components/Home';
import {Tables} from './components/Tables'
import RequireAuth from './guard/RequireAuth';
import { ResetPassword } from './account/ResetPassword';
import { ForgotPassword } from './account/ForgotPassword';
import { FreeTables } from './components/FreeTables';
import { Order } from './components/Order';

class App extends Component {

  render() {
    return (
      
      <BrowserRouter>
      <Routes>
            <Route path='/' exact={true} element={ <Home/> }/>
            <Route path='/login' exact={true} element={ <Login/> }/>
            <Route path='/register' exact={true} element={ <Register/> }/>
            <Route path='/forgot-password' exact={true} element={<ForgotPassword/>} />
            <Route path='/reset-password/:token' exact={true} element={ <ResetPassword/> }/>
            <Route path='/tables' exact={true} element={ <RequireAuth> <Tables/> </RequireAuth> } /> 
            <Route path='/freeTables' exact={true} element={ <RequireAuth><FreeTables/></RequireAuth> }/>
            <Route path='/order' exact={true} element={<RequireAuth><Order/></RequireAuth>}/>

        </Routes>
        </BrowserRouter>
    )
  }
}

export default App;

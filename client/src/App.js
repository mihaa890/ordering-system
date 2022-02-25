import './App.css';
import React from 'react';
import {Component} from 'react';
import { BrowserRouter,
  Routes,
  Route } from 'react-router-dom';
import {Login} from './account/login/Login';
import {Register} from './account/register/Register';
import {Home} from './components/home/Home';
import {Tables} from './components/tables/Tables'
import RequireAuth from './guard/RequireAuth';
import { ResetPassword } from './account/reset-password/ResetPassword';
import { ForgotPassword } from './account/forgot-password/ForgotPassword';
import { FreeTables } from './components/tables/FreeTables';
import { Order } from './components/order/Order';
import {OrderingSystem } from './components/order/OrderingSystem';
import { Menu } from './components/menu/Menu';

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
            <Route path='/order/:id' exact={true} element={<RequireAuth><Order/></RequireAuth>}/>
            <Route path='/getOrder/:id' exact={true} element={<RequireAuth> <OrderingSystem/> </RequireAuth>}/>
            <Route path='/menu' exact={true} element={<RequireAuth><Menu/></RequireAuth>}/>



        </Routes>
        </BrowserRouter>
    )
  }
}

export default App;

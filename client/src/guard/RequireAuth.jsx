import React from "react";
import { Navigate } from "react-router-dom";
import {STORAGE_KEYS} from '../utils/constants'

    function RequireAuth({children}) {

        const isAuthenticated = localStorage.getItem(STORAGE_KEYS.USER_KEY);      
        return isAuthenticated ? children : <Navigate to="/login" replace />;
      }


export default RequireAuth;
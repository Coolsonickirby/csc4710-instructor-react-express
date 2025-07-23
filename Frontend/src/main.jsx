import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './index.css';
import App from './App.jsx';
import BooksDatabase from './BooksDatabase.jsx';
import CustomerLogin from './Customer/CustomerLogin.jsx';
import CustomerRegistration from './Customer/CustomerRegisteration.jsx';
import CustomerShop from './Customer/CustomerShop.jsx';
import Logout from './Logout.jsx'
import { ADMIN_LOGIN_TOKEN, CUSTOMER_TOKEN_KEY } from './consts.jsx';
import AdminLogin from './Admin/AdminLogin.jsx';

const loggedIn = () => {
    return localStorage.getItem(CUSTOMER_TOKEN_KEY) != null || localStorage.getItem(ADMIN_LOGIN_TOKEN) != null;
}

const isAdmin = () => {
    return localStorage.getItem(ADMIN_LOGIN_TOKEN) != null;
}

const getDefaultRoute = () => {
    if(loggedIn()){
        return isAdmin() ? '/admin/books' : '/customer/books';
    } else {
        return '/customer/login';
    }
};

createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace/>} />
      <Route path="/customer/login" element={loggedIn() ? <Navigate to="/" /> : <CustomerLogin />} />
      <Route path="/admin/login" element={loggedIn() ? <Navigate to="/" /> : <AdminLogin />} />
      <Route path="/customer/register" element={loggedIn() ? <Navigate to="/" /> : <CustomerRegistration />} />
      <Route path="/customer/books" element={!loggedIn() ? <Navigate to="/" /> : <CustomerShop />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin/books" element={loggedIn() ? <BooksDatabase /> : <Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

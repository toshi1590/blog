import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './jsx/Header';
import {HomePage} from './jsx/HomePage';
import {BlogPage} from './jsx/BlogPage';
import {ContactPage} from './jsx/ContactPage';
import {AdminPage} from './jsx/AdminPage';
import {RegisterPage} from './jsx/RegisterPage';
import {LoginPage} from './jsx/LoginPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<BlogPage />} />
        <Route path="/articles/:id_or_category_or_months" element={<BlogPage />} />
        <Route path="/articles/:year/:month" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={"not exist"} />
      </Routes>
    </BrowserRouter>
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

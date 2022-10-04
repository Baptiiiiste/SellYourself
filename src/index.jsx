import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/index';
import Header from './components/Header/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/*" element={<p> 404 </p>} />
      </Routes>

    </Router>
  </React.StrictMode>
);



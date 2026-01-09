import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import ToastProvider from './components/ToastProvider';
import Login from './Pages/Login';
const App = () => {

  return (
    <BrowserRouter>
    <ToastProvider/>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route  path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

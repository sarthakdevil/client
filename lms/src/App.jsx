import React from 'react';
import './App.css';
import HomePage from './components/homepage';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './components/aboutus';
import NotFound from './components/404';
import Signup from './components/signup';
function App() {

  return (
    <>
         <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        </Routes>
    </>
  )
}

export default App

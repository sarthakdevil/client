import React from 'react';
import './App.css';
import HomePage from './components/homepage';
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
         <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        </Routes>
    </>
  )
}

export default App

import React from 'react';
import './App.css';
import HomePage from './components/homepage';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './components/aboutus';
import NotFound from './components/404';
import Signup from './components/signup';
import Login from  "./components/login";
import Contact from './components/Contact';
import CourseList from './components/course/courses';
import CourseDescription from './components/course/coursedescription';
import Denied from './components/Denied';
import RequireAuth from './components/auth/RequireAuth';
import CreateCourse from './components/course/CreateCourse';
import Profile from './components/Profile';
function App() {

  return (
    <>
         <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/denied" element={<Denied/>} />
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path = "/contact" element={<Contact/>}></Route>
        <Route path = "/courses" element={<CourseList/>}></Route>
        <Route path="/course/description" element={<CourseDescription />} />
        <Route element={<RequireAuth allowedRoles={"ADMIN"}/>}>
          <Route path="/create" element={<CreateCourse/>}></Route> 
          
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
          <Route path='/user/profile' element={<Profile/>}>
          </Route>
        </Route>
        </Routes>
    </>
  )
}

export default App

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
import EditProfile from './components/profileedit';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import CheckoutFailure from './components/CheckoutFailure';
import AdminDashboard from './components/admin/AdminDashboard'
import DisplayLectures from './components/admin/Displaylectures'
import AddLecture from './components/admin/Addlecture';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/displaylectures" element={<DisplayLectures/>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route  element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path = "/course/addlecture" element={<AddLecture/>} />
          <Route path="/create" element={<CreateCourse />} />
          <Route path = "/dashboard" element ={<AdminDashboard/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path='/user/profile' element={<Profile />}>
          </Route>
          <Route path='/user/editprofile' element={<EditProfile />} />
        </Route>
        <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/checkout/fail' element={<CheckoutFailure />} />
      </Routes>
    </>
  );
}

export default App;

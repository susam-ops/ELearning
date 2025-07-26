import React from "react";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Teacher from "./pages/Teacher";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import Courses from "./pages/Courses";
import Features from "./pages/Features";
import Aboutus from "./pages/Aboutus";
import Userdetails from "./Admin/Userdetails";
import Teacherdetails from "./Admin/Teacherdetails";
import Dashboard from "./Admin/Dashboard";
import Coursemanagement from "./Admin/Coursemanagement";
import Contentmanagement from "./Admin/Contentmanagement";
import Systemsetting from "./Admin/Systemsetting";
import TeacherManagement from "./Admin/TeacherManagement";
import Addteacher from "./Admin/Addteacher";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="features" element={<Features />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<Admin/>}>
          <Route path="" element={<Dashboard />} />
          <Route path="userdetails" element={<Userdetails />} />
          <Route path="teachermanagement" element={<TeacherManagement/>} />
          <Route path="coursemanagement" element={<Coursemanagement/>} />
          <Route path="contentmanagement" element={<Contentmanagement/>} />
          <Route path="systemsetting" element={<Systemsetting/>} />
      
          <Route path="addteacher" element={<Addteacher/>} />
          <Route path="teacherdetails" element={<Teacherdetails />} />
        </Route>
        <Route path="user" element={<User />} />
        <Route path="teacher" element={<Teacher />} />
      </Routes>
    </>
  );
}

export default App;

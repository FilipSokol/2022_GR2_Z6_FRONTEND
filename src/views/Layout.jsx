import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import Home from "./Home";
import Login from "./Login";
import Error from "./Error";
import { useState, useEffect } from "react";
import authService from "../services/auth.service";
import TimeTable from "./Timetable";
import StudentGrades from "./StudentGrades";

export default function Layout() {
  const [currentUser, setCurrentUser] = useState(undefined);

  const AuthVerify = () => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  };

  useEffect(() => {
    AuthVerify();
  }, [location.pathname]);

  //TODO Fix: relaod after login and then check auth. Async problem with loading data first and setting corect state

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes token={currentUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/oceny" element={<StudentGrades />} />
          <Route path="/plan" element={<TimeTable />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </BrowserRouter>
  );
}

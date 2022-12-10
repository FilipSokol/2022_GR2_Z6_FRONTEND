import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import Home from "./Home";
import Login from "./Login";
import Error from "./Error";
import TimeTable from "./TimeTable";
import authService from "../services/auth.service";
import StudentGrades from "./StudentGrades";
// import SemesterGrades from "./StudentGrades/SemesterGrades";
// import AllSemesterGrades from "./StudentGrades/AllSemesterGrades";
import Register from "./Register";
import AdminPanel from "./Admin";
import TeacherTimeTable from "./TeacherTimetable";
import TeacherStudentsGrades from "./TeacherGrades";

export default function Layout() {
  const useAuthRoutes = () => {
    const token = authService.getCurrentUser();
    const user = authService.parseJwt(token);
    const role =
      user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    switch (role) {
      case "Student":
        return (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/oceny" element={<StudentGrades userData={user} />} />
            {/* <Route path="/oceny" element={<StudentGrades />}>
              <Route index element={<SemesterGrades />} />
              <Route path="semestr" element={<SemesterGrades />} />
              <Route path="ogolne" element={<AllSemesterGrades />} />
            </Route> */}
            <Route path="/plan" element={<TimeTable userData={user} />} />
            <Route path="*" element={<Error />} />
          </>
        );
      case "Teacher":
        return (
          <>
            <Route path="/" element={<Home />} />
            <Route
              path="/oceny"
              element={<TeacherStudentsGrades userData={user} />}
            />
            <Route
              path="/plan"
              element={<TeacherTimeTable userData={user} />}
            />
            <Route path="*" element={<Error />} />
          </>
        );
      case "Admin":
        return (
          <>
            <Route path="/" element={<AdminPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Error />} />
          </>
        );
      default:
        return <Route path="*" element={<Error />} />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>{useAuthRoutes()}</Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/rejestracja" />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./Error";
import Home from "./Home";

export default function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

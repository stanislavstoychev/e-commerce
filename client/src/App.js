import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/nav/Menu';
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute.js";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  );
};
export default function App() {
  //Old way <Route path="/" element={,Home />}
  
  return (
    <BrowserRouter>
      <Menu />
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* create a private route!!! */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          {/* Route is /dashboard/secret */}
        </Route>

        <Route path="*" element={<PageNotFound/>} replace />
      </Routes>
    </BrowserRouter>
  );
}


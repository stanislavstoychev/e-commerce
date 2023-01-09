import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
// import Search from "../forms/Search";
// import useCategory from "../../hooks/useCategory";
// import { useCart } from "../../context/cart";
// import { Badge } from "antd";

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
    
  // hooks
//   const categories = useCategory();
  const navigate = useNavigate();

  // console.log("categories in menu => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>

        {/* conditional Rendering */}
        {!auth.user ? (
        <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
          </>
        ) : (
            <div className="dropdown mx-3">
              <li>
                <a className="nav-item pointer dropdown-toggle" data-bs-toggle="dropdown">{auth?.user.name}</a>
              <ul className="dropdown-menu">
                <li>
                <NavLink className="nav-link" to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink>
                </li>
                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">Log out</a>
                </li> 
              </ul>
              </li>
          </div>
        )}  
        
        
        {/* <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><NavLink className="dropdown-item" to="/">Action</NavLink></li>
            <li><NavLink className="dropdown-item" to="/">Another action</NavLink></li>
            <li><NavLink className="dropdown-item" to="/">Something else here</NavLink></li>
          </ul>
              </li> */}
        </ul>      
    </>
  );
}

import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth.js';
import { useNavigate, useLocation } from "react-router-dom";
 
export default function Login() {
  //state
  const [email, setEmail] = useState("ss@stani.live");
  const [password, setPassword] = useState('12345678');
//hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, { email, password });
      //if data exist than...
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem('auth', JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successful");
        navigate(location.state || "/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try again!");

    }
  };

    return (
        <div className="">
        <Jumbotron title="Login" subtitle="Please enter your login credentials" />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
              <input type="email" className="form-control mb-4 p-2" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}  />
              <input type="password" className="form-control mb-4 p-2" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}  />

              <button className="btn btn-primary" type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
        {/* <pre>User name:{JSON.stringify(name, null, 4)}</pre>
        <pre>User email:{JSON.stringify(email, null, 4)}</pre>
        <pre>User password:{JSON.stringify(password, null, 4)}</pre> */}
      </div>
    );
  }
  
  
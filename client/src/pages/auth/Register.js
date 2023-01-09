import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth.js';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("Stani");
  const [email, setEmail] = useState("ss@stani.live");
  const [password, setPassword] = useState('12345678');

  //hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`, { name, email, password });
      //if data exist than...
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem('auth', JSON.stringify(data));

        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful");
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again!");

    }
  };

    return (
        <div className="">
        <Jumbotron title="Register" subtitle="Please register as a new user" />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
              <input type="text" className="form-control mb-4 p-2" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
              <input type="email" className="form-control mb-4 p-2" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}  />
              <input type="password" className="form-control mb-4 p-2" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}  />

              <button className="btn btn-primary" type="submit">Submit</button>
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
  
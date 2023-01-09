import Jumbotron from "../components/cards/Jumbotron.js";
import { useAuth } from "../context/auth";
export default function Home() {
  const[auth, setAuth] = useAuth();
    return (
        <div className="">
        <Jumbotron title="E-commerce" subtitle="welcome to the website for trading" />
        <pre>{ JSON.stringify(auth, null, 4)}</pre>
      </div>
    );
  }
  
  
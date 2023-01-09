import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGIF from '../../images/loading.gif';

export default function Loading() {
    //state
    const [count, setCount] = useState(3);
    //hooks
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => { 
        const interval = setInterval(() => { 
            setCount((currentCount) => --currentCount)
        }, 1000);
        // redirect once count is equal to 0
        count === 0 && navigate("/login",{state: location.pathname})
        // cleanup
        return () => clearInterval(interval);
    }, [count]);
    
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {/* Redirecting you in {count} seconds ... */}
            
                <img style={{ width: "400px" }} src={LoadingGIF} alt="Loading ..." />
           
       </div> 
    )
}
import { Routes, Route, useNavigate } from "react-router-dom"

import SignInPage from "./signInPage"
import { useEffect } from "react";

function Register() {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/signin')
    }, [])

    return(
        <div className="register">
            <div className="registerNavBar">
                <button onClick={()=>{navigate('/login')}}>
                    Log In
                </button>
                <button onClick={()=>{navigate('/signin')}}>
                    Sign In
                </button>
            </div>

            <Routes>
                <Route path='/signin' Component={SignInPage}/>
            </Routes>
        </div>
    )
}

export default Register
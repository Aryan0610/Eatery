import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser, signUpNewUser } from "../../config/supabaseComp"
import logo from '../../img/Logo.svg'
import styles from './register.module.css'

function SignUpPage(){
    const navigate = useNavigate()

    const [signedIn, setSignedIn] = useState(false)

    useEffect(() => {
        async function getUserFunc() {
            async function getUserFunc() {
                const val = await getUser()
                if (val.session === null) {
                    setSignedIn(false)
                } else {
                    setSignedIn(true)
                }
            }
    
            getUserFunc()
        }

        getUserFunc()
    }, [signedIn])

    if (signedIn) {
        navigate('/home')
    } else {
        return (
            <SignUpDisplay/>
        )
    }
}

function SignUpDisplay() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState({bool: false, msg: ''})

    async function handleSubmit(e) {
        e.preventDefault()

        let flag = 0
        
        if (username === '' || email === '' || password === '' || cPassword === '') {
            flag = 1
            setErrorMsg({bool: true, msg: 'Please fill all the details'})
        }

        if (password !== cPassword) {
            flag = 1
            setErrorMsg({bool: true, msg: 'Passwords do not match'}) 
        }

        if (flag === 0) {
            signUpNewUser(email, password, username).then(user => {
                if (user) {
                    navigate('/home')
                }
            })
        }

    }

    return (
        <div>
            <div className={styles.logo}>
                <img src={logo} alt="logo" onClick={() => navigate('/')}/>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input 
                        type="text"
                        onChange={(e)=>{setUsername(e.target.value)}}
                        required>
                    </input>

                    <label>Email:</label>
                    <input 
                        type='email'
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required>
                    </input>

                    <label>Password:</label>
                    <input 
                        type="password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required>
                    </input>

                    <label>Confirm Password:</label>
                    <input 
                        type="password"
                        onChange={(e)=>{setCPassword(e.target.value)}}
                        required>
                    </input>

                    <div>
                        <button onClick={(e) => {handleSubmit(e)}}>
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className={styles.LinkToBtn}>
                    <div>
                        Already Have an account?
                    </div>
                    <button onClick={()=>{navigate('/signin')}}>
                        Sign In
                    </button>
                </div>

                <div>
                    {errorMsg.msg}
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
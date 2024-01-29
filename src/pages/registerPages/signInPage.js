import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser, signInUser } from "../../config/supabaseComp"
import logo from '../../img/Logo.svg'
import styles from './register.module.css'

function SignInPage(){
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
            <SignInDisplay/>
        )
    }
}

function SignInDisplay() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState({bool: false, msg: ''})

    async function handleSubmit(e) {
        e.preventDefault()

        let flag = 0
        
        if (email === '' || password === '') {
            flag = 1
            setErrorMsg({bool: true, msg: 'Please fill all the details'})
        }

        if (flag === 0) {
            signInUser(email, password).then(user => {
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
                <label>Email:</label>
                <input 
                    type="email"
                    onChange={(e)=>{setEmail(e.target.value)}}>
                </input>

                <label>Password:</label>
                <input 
                    type="text"
                    onChange={(e)=>{setPassword(e.target.value)}}>
                </input>

                <div>
                    <button onClick={(e) => {handleSubmit(e)}}>
                        Sign In
                    </button>
                </div>
            </form>

            <div className={styles.LinkToBtn}>
                <div>
                    Don't Have an Account?
                </div>
                <button onClick={()=>{navigate('/signup')}}>
                    Sign Up
                </button>
            </div>

            <div>
                {errorMsg.msg}
            </div>
        </div>
        </div>
    )
}

export default SignInPage
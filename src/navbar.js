import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { LogOut, getAllRecipe, getUser } from './config/supabaseComp';

import './navbar.css'
import Logo from './img/Logo.svg'
import ProfileIconImg from './img/ProfileIcon.svg'

function NavBarProfileComponent() {
    const [signInStatus, setSignInStatus] = useState(null)
    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    
    useEffect(() => {
        async function getUserFunc() {
            const val = await getUser()
            if (val.session === null) {
                setSignInStatus(false)
            } else {
                setSignInStatus(true)
                setUsername(val.session.user.user_metadata.username)
            }
        }

        getUserFunc()
    }, [])

    if (signInStatus === null) {

    } else {
        if (signInStatus) {
            return (
                <ProfileIcon username={username}/>
            )
        } else {
            return (
                <div className='NavBarButtonsContainer'>
                    <button onClick={()=>{navigate('/signin')}}>
                        Log In
                    </button>
                    <button onClick={()=>{navigate('/signup')}}>
                        Sign Up
                    </button>
                </div>
            )
        }
    }
}

function ProfileIcon({username}) {
    const navigate = useNavigate()
    const [profileSidePane, setProfileSidePane] = useState(false)

    return (
        <div className='NavBarButtonsContainer'>
            <img src={ProfileIconImg} onClick={() => setProfileSidePane(true)} alt='Profile'/>
            {profileSidePane ?
            <div className='ProfileSidePanelContainer'>
                <div className='ProfileSidePanel'>
                    <img src={ProfileIconImg} width="80px" height="80px" alt='Profile'/>
                    <h2>{username}</h2>
                    <div className='ButtonContainer'>
                        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                        <button onClick={() => navigate('/dashboard/create')}>Create</button>
                        <button onClick={() => {
                            LogOut()
                            navigate('/')
                        }}>Log Out</button>
                    </div>
                </div>
                <div className='ProfileSidePanelBg' onClick={() => setProfileSidePane(false)}/>
            </div> 
             : ''}
        </div>
    )
}

function NavBar() {
    const navigate = useNavigate()

    const [recipes, setRecipes] = useState(null)
    const [SearchBarFocus, setSearchBarFocus] = useState(false)
    const [SearchBarText, setSearchBarText] = useState('')

    useEffect(() => {
        async function getRecipeFunc() {
            let getRecipe = await getAllRecipe()
            if (getRecipe) {
                setRecipes(getRecipe)
            }
        }

        getRecipeFunc()
    }, [])

    function NavBarSearchResult() {
        const navigate = useNavigate()
        let temp = []
        if (recipes) {
            if (recipes) {
                for(let i=0; i<recipes.length; i++) {
                    if (recipes[i].name.toLowerCase().includes(SearchBarText.toLowerCase()) && SearchBarText !== '') {
                        temp.push({id: recipes[i].id, name: recipes[i].name})
                    }
                } 
            }
        }

        if (temp.length !== 0) {
            return (
                <div className='SearchResultsDiv'>
                    {temp.map((item, index) => (
                        <div key={index} className='SearchResultItem' onClick={() => navigate(`/home/${item.id}/${item.name}`)}>
                            {item.name}
                        </div>
                    ))}
                </div>
            )
        }
    }
    
    return (
        <div className="NavBar">
            <div onClick={()=>{navigate('/home')}}>
                <img src={Logo} alt='Logo' className='Logo'/>
            </div>
            <div className='SearchBarContainer'>
                <textarea rows={1} className='SearchBar' placeholder='Search' onClick={() => {setSearchBarFocus(true)}} onChange={(e) => {setSearchBarText(e.target.value)}}/>
                {SearchBarFocus ? <NavBarSearchResult/> : ''}
            </div>
            <div className={`SearchBarBg ${SearchBarFocus ? 'Visible' : 'NotVisible'}`} onClick={() => {setSearchBarFocus(false)}}/>
            <NavBarProfileComponent/>
        </div>
    )
}

export default NavBar
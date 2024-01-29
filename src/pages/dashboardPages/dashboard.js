import { useNavigate } from "react-router-dom"
import NavBar from "../../navbar"
import './dashboard.css'
import { useEffect, useState } from "react"
import { getAllRecipeForUser, getUser } from "../../config/supabaseComp"
import supabase from "../../config/supabaseClient"

function Dashboard() {
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState()

    useEffect(() => {
        async function getUserFunc() {
            const val = await getUser()
            if (val.session !== null) {
                let recipes = getAllRecipeForUser(val.session.user.id)
                if (recipes.length > 0) {
                    setRecipe(recipes)
                }
            }
        }

        getUserFunc()

            // getUser().then((val) => {
            //     getAllRecipeForUser(val.user.id).then((recipe) => {
            //         setRecipe(recipe)
            //     })
            // })
    }, [])

    function getImg(userId) {
        const storage = supabase.storage.from('images')
        const getPublicUrl = storage.getPublicUrl(`images/recipeImg/${userId}`)
        return getPublicUrl.data.publicUrl
    }

    let showRecipeDiv
    if (recipe) {
        showRecipeDiv = recipe.map(function(item, i) {
            return (
                <RecipeComponent key={i} id={item.id} img={getImg(item.id)} name={item.name} description={item.description} ingredients={item.ingredients} instructions={item.instructions}/>
            )
        })
    }

    return (
        <div>
            <NavBar/>
            <div className="dashboardContainer">
                <div className="headerContainer">
                    My Recipes
                    <button onClick={() => navigate('create')}>Create Recipe</button>
                </div>
                <div className="recipeArray">
                    {recipe? showRecipeDiv : ''}
                </div>
            </div>
        </div>
    )
}

function RecipeComponent({id, img, name, description, ingredients, instructions}) {  
    const navigate = useNavigate()

    return (
        <div className="recipeElement">
            <div className="ImgContainer">
                <img src={img} alt="RecipeImg"/>
            </div>
            <div className="subContainer">
                <div>{name}</div>
                <button onClick={() => {navigate(`/home/${id}/${name}`)}}>Show Recipe</button> 
            </div>
        </div>
    )
}

export default Dashboard
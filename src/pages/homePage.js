import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient" 
import { useNavigate } from "react-router-dom"
import { getAllRecipe } from "../config/supabaseComp"
import NavBar from "../navbar"
import './homePage.css'

function HomePage() {
    const [dataComponent, setDataComponent] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      async function getRecipes() {
        let recipes = await getAllRecipe()
        setDataComponent(recipes)
        setLoading(false)
      }

      getRecipes()
    }, [dataComponent])


    function getImg(userId) {
        const storage = supabase.storage.from('images')
        const getPublicUrl = storage.getPublicUrl(`images/recipeImg/${userId}`)
        return getPublicUrl.data.publicUrl
    }

    let showLatestRecipe = dataComponent.slice(0,6).map(function(item, i) {
        return (
            <RecipeComponent key={i} id={item.id} img={getImg(item.id)} name={item.name}/>
        )
    })

    let showRecipeDiv = dataComponent.slice(6).map(function(item, i) {
        return (
            <RecipeComponent key={i} id={item.id} img={getImg(item.id)} name={item.name}/>
        )
    })

    return (
        <div>
            <NavBar/>
            {loading? 
                <div style={{
                    position: "absolute",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "80px 0px",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#323232"
                }}>
                    Loading
                </div> 
            : 
                <div>
                    <div style={{
                        padding: "20px 40px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#323232"
                    }}>
                        Latest Recipe
                        <div className="recipeArray">
                            {showLatestRecipe}
                        </div>
                    </div>
                    <div style={{
                        padding: "20px 40px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#323232"
                    }}>
                        Discover Recipe
                        <div className="recipeArray">
                            {showRecipeDiv}
                        </div>
                    </div>
                </div>
            }       
        </div>
    )
}

function RecipeComponent({id, img, name}) {  
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
   
export default HomePage
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import {getRecipe, getRecipeImg} from '../config/supabaseComp'

import NavBar from "../navbar"
import './recipe.css';

function Recipe() {
    const { id } = useParams()

    return (
        <DisplayRecipe id={id}/>
    )
}

function DisplayRecipe({id}) {
    const [recipe, setRecipe] = useState('')
    const [recipeImg, setRecipeImg] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getRecipes() {
            let recipe = await getRecipe(id)
            let img = await getRecipeImg(id)
            setRecipeImg(img)
            setRecipe(recipe[0])
            setLoading(false)
          }
    
          getRecipes()
    }, [id])

    if (loading) {
        return (
            <div>
                <NavBar/>
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
            </div>
        )
    } else {
        return (
            <div>
                <NavBar/>
                <div className="RecipeContainer">
                    <div className="ImgNameDescriptionContainer">
                        <div className="ImgContainer">
                            <img src={recipeImg} alt="Recipe Img"/>
                        </div>
                        <div className="NameDescriptionContainer">
                            <div>{recipe.name}</div>   
                            <span>{recipe.description}</span>   
                        </div>
                    </div>
                    <div className="IngredientsAndInstructionsContainer">
                        <div className="InstructionsContainer">
                            <div className="InstructionsContainerHeader">Instructions</div>
                            {recipe && JSON.parse(recipe.instructions).map((item, index) => (
                                <div key={index} className="ElementContainer">
                                    <hr className="ElementHr"/>
                                    <div key={index} className="InstructionElement">
                                        <div className="ElementIndex">{index+1}</div>
                                        <div className="ElementItem">{item}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="IngredientsContainer">
                            <div className="IngredientsContainerHeader">Instructions</div>
                            {recipe && JSON.parse(recipe.ingredients).map((item, index) => (
                                <>
                                    <hr className="ElementHr"/>
                                    <div key={index} className="IngredientsElement">
                                        <div className="ElementIndex">{index+1}</div>
                                        <div className="ElementItem">
                                            <div>{item.name}</div>
                                            <div>{item.quantity}</div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipe
import { useState } from "react"
import NavBar from "../../navbar"
import TextareaAutosize from 'react-textarea-autosize';
import './createRecipe.css'
import { createRecipe } from "../../config/supabaseComp";

function InstructionsDiv({instructions, setInstructions}) {
  const handleInputChange = (index, event) => {
    const newInstructions = [...instructions]
    newInstructions[index] = event.target.value
    setInstructions(newInstructions)
  };

  const handleDelete = (index) => {
    const newInstructions = [...instructions]
    newInstructions.splice(index, 1)
    setInstructions(newInstructions)
  };

  return (
    <div className="InstructionsContainer">
      <h2>Instructions</h2>
      {instructions.map((item, i) => (
        <div key={i} className="InstructionsElement">
          <div className="serialNum">{i+1}</div>
          <TextareaAutosize placeholder="instruction" className="insTextarea" value={item} onChange={(e) => handleInputChange(i, e)} />
          <button className="deleteBtn" onClick={() => handleDelete(i)}>Delete</button>
        </div>
      ))}
      <button className="addBtn" onClick={() => setInstructions([...instructions, '' ])}>Add</button>
    </div>
  )
}

function IngredientsDiv({ingredients, setIngredients}) {
  const handleInputChangeForName = (index, event) => {
    const newInstructions = [...ingredients]
    newInstructions[index].name = event.target.value
    setIngredients(newInstructions)
  };

  const handleInputChangeForQuantity = (index, event) => {
      const newInstructions = [...ingredients]
      newInstructions[index].quantity = event.target.value
      setIngredients(newInstructions)
    };

  const handleDelete = (index) => {
    const newInstructions = [...ingredients]
    newInstructions.splice(index, 1)
    setIngredients(newInstructions)
  };

  return (
    <div className="IngredientsContainer">
      <h2>Ingredients</h2>
      {ingredients.map((item, i) => (
        <div key={i} className="IngredientsElement">
          <div className="serialNum">{i+1}</div>
          <div className="ingTextareaContainer">
              <TextareaAutosize placeholder="name" value={item.name} onChange={(e) => handleInputChangeForName(i, e)}/> 
              <TextareaAutosize placeholder="quantity" value={item.quantity} onChange={(e) => handleInputChangeForQuantity(i, e)}/> 
          </div>
          <button className="deleteBtn" onClick={() => handleDelete(i)}>Delete</button>
        </div>
      ))}
      <button className="addBtn" onClick={() => setIngredients([...ingredients, { description: '' }])}>Add</button>
    </div>
  )
}

function CreateRecipe() {  
  const [img, setImg] = useState({
    path: null,
    url: 'img/imgSelectorBaseImg.svg'
  })
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [instructions, setInstructions] = useState([''])
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }])


  const imgComponent = {
    path: null,
    url: null
  }

  function AddImage(path) {
    imgComponent.path = path
    imgComponent.url = URL.createObjectURL(path)
    setImg(imgComponent)
  }

  function handleSubmit() {
    createRecipe(img, name, description, instructions, ingredients)
  }

  return (
    <div>
      <NavBar/>
      <div className="CreateRecipeContainer">
        <div className="NameAndImgContianer">
          <div className="ImageContainer">
            <div>
              <input type="image" src={img.url} alt="Img"/>
            </div>
            <input type="file" onChange={(e) => {
              AddImage(e.target.files[0])
            }}/>
          </div>
          <div className="NameAndDescripSectionContainer">
            <TextareaAutosize type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/> 
            <TextareaAutosize type="text" placeholder="Description" onChange={(e) => {setDescription(e.target.value)}}/> 
          </div>
        </div>
        <div className="IngredientsAndInstructionsContainer">
          <InstructionsDiv instructions={instructions} setInstructions={setInstructions}/>
          <IngredientsDiv ingredients={ingredients} setIngredients={setIngredients}/>
        </div>
        <div className="SubmitBtn">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe
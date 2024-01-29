import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignInPage from './pages/registerPages/signInPage';
import SignUpPage from './pages/registerPages/signupPage';
import Dashboard from './pages/dashboardPages/dashboard';
import Recipe from './pages/recipe';
import HomePage from './pages/homePage';
import CreateRecipe from './pages/dashboardPages/createRecipe';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/home'/>}/>
          <Route path='/home' element={<HomePage/>}/> 
          <Route path='/home/:id?/:recipeName?' element={<Recipe/>}/>
          <Route path='/dashboard/create' element={<CreateRecipe/>}/>
          <Route path='/signin' element={<SignInPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

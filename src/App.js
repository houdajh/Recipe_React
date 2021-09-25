import logo from './logo.svg';
import './App.css';
import React ,{useEffect , useState} from "react"
import Recipe from './Recipe';

const App =() => {



  const APP_ID ="f534f47a";
  const APP_KEY =" 0791c1c201dfd73c583c74991c0369e5	";
  const [recipes , setRecipes] =useState([]);
  const [search , setSearch] =useState("");
  const [query , setQuery] =useState("chicken")

  
  useEffect(()=>{
    getRecipes()
    
  },[query])

  const getRecipes = async() =>{
      const response =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json()
      setRecipes(data.hits);
      console.log(data.hits);
     
  }

  const updateSearch =e =>{
    setSearch(e.target.value)
  }
  
  const getSearch =e =>{
    e.preventDefault();
    setQuery(search)
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search
         </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
        key ={recipe.recipe.label}
         title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        ingredients={recipe.recipe.ingredients}
        image={recipe.recipe.image}/>

      ))};
      </div>
    </div>
  );
}

export default App;

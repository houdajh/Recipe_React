import logo from './logo.svg';
import './App.css';
import React ,{useEffect , useState} from "react"
import Recipe from './Recipe';
import { faUsers,faUser, faCut, faBullhorn, faPenNib, faCircle, faPalette, faVolumeUp, faSmile, faGrin, faShekelSign, faTv, faUserTie, faFolder, faPaintBrush, faCircleNotch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { Link, useHistory } from "react-router-dom";
import firebase from '@firebase/app-compat';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const App =() => {



  const APP_ID ="f534f47a";
  const APP_KEY =" 0791c1c201dfd73c583c74991c0369e5	";
  const [recipes , setRecipes] =useState([]);
  const [search , setSearch] =useState("");
  const [query , setQuery] =useState("chicken")
  const history = useHistory()
  
  useEffect(()=>{
    getRecipes()
    
  },[query])

  const [user, setUser] = useState(null)
useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Successufully Signed out");
      })
      .catch(function () {
        console.log("Error Signed out");
      });
      history.push("/signIn")
  };


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
      <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                   
                </div>
                <div className="topnav__right-item">
                <button  type="button" className="button">Sign out</button>
                  
                </div>
                
                
            </div>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <style>
        {`    
.button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgb(230, 22, 126);
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button:hover {background-color: #e42ab5}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
`}
</style>
        <button className="button" type="submit">Search
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

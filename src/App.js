import logo from './logo.svg';
import './App.css';
import React ,{useEffect , useState} from "react"
import Recipe from './Recipe';
import { faUsers,faUser, faCut, faBullhorn, faPenNib, faCircle, faPalette, faVolumeUp, faSmile, faGrin, faShekelSign, faTv, faUserTie, faFolder, faPaintBrush, faCircleNotch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
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
      
           
            <h1 className="title">Welcome, choose your healthy food 🍛 ,<br></br> and Enjoy</h1>
            
            <button onClick={signOut} type="button" className="button">Sign out</button>
            
            <div className="topnav__right-item">
                
                <form onSubmit={getSearch} className="search-form" >
        <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder=" Enter ingridient ..."/>
       
        <button className="button" type="submit">Search
         </button>
         
      </form>
                </div>
      
      
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

import React ,{useEffect , useState} from "react"
import style from './recipe.module.css';


const Recipe =({title,calories,image , ingredients}) =>{


  return (
    <div className={style.recipe}>
      <h1 >{title}</h1>
      <ol>{ingredients.map(ingredient=>(
        <ul>{ingredient.text}</ul>
      ))}
      </ol>
      <p>Calories : {calories}</p>
      <img className={style.image} src={image} alt="" />
    </div>
  );

}
export default Recipe;
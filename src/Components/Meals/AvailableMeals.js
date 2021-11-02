import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];


const AvailableMeals = ()=>{
  
    const[meals, setMeals] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState(false);

    useEffect(()=>{
      async function fetchMeals(){
        try {
          setIsLoading(true);
          const response = await fetch(
            "https://food-dilevery-app-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
          );
          const data = await response.json();

          let MEALS = [];
          for (const key in data) {
            MEALS.push({
              id: key,
              name: data[key].name,
              description: data[key].description,
              price: data[key].price,
            });
          }
          setMeals(MEALS);
          setIsLoading(false);

        } catch (err) {
          setIsLoading(false);
          setError(true)
          console.error('Error: ' + err.message);
        }
        
      }
      fetchMeals()
    },[])

    
    let mealsList = meals.map((meal) => {
        return (
          <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        );
    });  
    let mealsComponent = (
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    );
    let loadingComponent = (
      <Card>
      <p className={classes.loading}>Loading...</p>
      </Card>
    )
    let errorComponent = (
      <section className = {classes.meals}>
        <Card>
          <p className={classes.error}>Aw snap! Something went wrong :(</p>
        </Card>
      </section>
    );
    if(error){
      return errorComponent
    }
    return (
      <section className={classes.meals}>
      { isLoading&&!error ? loadingComponent : mealsComponent}
      </section>
    );
}

export default AvailableMeals;
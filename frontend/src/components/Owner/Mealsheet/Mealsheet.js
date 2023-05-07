import React from 'react'
import MealsheetForm from '../MealsheetForm/MealsheetForm'

//Query to find the hostel from userId
//If the hostel has any mealsheet, then how today's menu, update meal system and delete mealsystem 
//If they don't , just directly show MealsheetForm 
function Mealsheet() {
  return (
    <div>
      <MealsheetForm/>
    </div>
  )
}

export default Mealsheet

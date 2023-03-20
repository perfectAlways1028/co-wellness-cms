import { findMealService, createMealService, updateMealService, 
    deleteMealService, findOneMealService} from '../service/mealService'; 

import { observable, action, decorate, computed } from 'mobx';

class MealStore {
//observables

isLoading=false;
success=false;
error=null;

meals=[];

detailMeal = null;

currentAction=null;
totalCount=0;
limit=10;

findOneMeal(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneMealService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailMeal = response.data;
         this.success = true;
         return response.data;
       } else {
           this.success = false;
           this.error = 'No data.';
       }
       
   }))
   .catch(action((err) => {
     this.success = false;
     this.error = err.message;
     throw err;
   }))
   .finally(action(() => { this.isLoading = false; }));
}

findAllMeals() {
  let filter = {
  }
  return findMealService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           return response.data.meal;
         }
     }))
     .catch(action((err) => {
       throw err;
     }))
     .finally(action(() => {}));

}
findMeals(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findMealService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.meals = response.data.meal;
           this.totalCount = response.data.count;
           this.success = true;
         } else {
             this.success = false;
             this.error = 'No data.';
         }
         
     }))
     .catch(action((err) => {
       this.success = false;
       this.error = err.message;
       throw err;
     }))
     .finally(action(() => { this.isLoading = false; }));
}

createMeal(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createMealService(body)
   .then(action(response => {
     this.success = true;
     return response.data;
   }))
   .catch(action((err) => {
     this.success = false;
     this.error = err.message;
     
     throw err;
   }))
   .finally(action(() => { this.isLoading = false; }));
}

updateMeal(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateMealService(id, body)
   .then(action(response => {
     console.log("response",response);
       this.success = true;
   
   }))
   .catch(action((err) => {
    console.log("err", err)
     this.error = err.message;
     this.success = false;
     throw err;
   }))
   .finally(action(() => { this.isLoading = false; }));
}
deleteMeal(id) {
 this.isLoading = true;
 this.error = undefined;
 return deleteMealService(id)
   .then(action(response => {
     console.log("response",response);
       this.success = true;
   }))
   .catch(action((err) => {

     this.success = false;
     this.error = err.message;
     throw err;
   }))
   .finally(action(() => { this.isLoading = false; }));
}


}

decorate(MealStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 meals: observable,
 detailMeal: observable,

 findMeals: action,
 findOneMeal: action,
 createMeal: action,
 updateMeal: action,
 deleteMeal: action

});

export default new MealStore();
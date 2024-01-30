import { Ingredient } from "../shared/ingredients.model";
import {Subject} from 'rxjs';
export class ShoppingListServices {
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Mango', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngrediant(ingrediant: Ingredient) {
        this.ingredients.push(ingrediant);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredents(ingredients:Ingredient[]){
        // for(let Ingredient of ingredients){
        //     this.addIngrediant(Ingredient)
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

}
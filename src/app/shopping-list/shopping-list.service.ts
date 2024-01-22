
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListServices {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Mango', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngrediant(ingrediant: Ingredient) {
        this.ingredients.push(ingrediant);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredents(ingredients:Ingredient[]){
        // for(let Ingredient of ingredients){
        //     this.addIngrediant(Ingredient)
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

}
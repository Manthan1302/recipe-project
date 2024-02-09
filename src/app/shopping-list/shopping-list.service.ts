import { Ingredient } from "../shared/ingredients.model";
import { Subject } from 'rxjs';
export class ShoppingListServices {
    ingredientsChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();
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

    addIngredents(ingredients: Ingredient[]) {
        // for(let Ingredient of ingredients){
        //     this.addIngrediant(Ingredient)
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    getIngredient(index:number){
        return this.ingredients[index]
    }

    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index]= newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
        
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice())
    }
}
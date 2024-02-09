import { ShoppingListServices } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipeChange = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a Test ', 'https://dcassetcdn.com/design_img/10150/1680/1680_298517_10150_image.jpg', [
            new Ingredient('Meat', 1),
            new Ingredient('French Fires', 20)
        ]),
        new Recipe('A Another Test Recipe', 'This is simply a Test ', 'https://dcassetcdn.com/design_img/10150/1680/1680_298517_10150_image.jpg', [
            new Ingredient('Buns', 1),
            new Ingredient('French Fires', 20)
        ]),
    ];
    constructor(private slService: ShoppingListServices) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {

        this.slService.addIngredents(ingredients)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChange.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        // console.log(this.recipes[index]);
        this.recipeChange.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        console.log(this.recipes);
        
        this.recipeChange.next(this.recipes.slice());
        
    }
} 
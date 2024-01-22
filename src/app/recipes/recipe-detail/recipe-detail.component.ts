import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() Recipe!: Recipe;

  constructor(private recipeService: RecipeService) {

  }
  onAddToShoppingList() {

    this.recipeService.addIngredientsToShoppingList(this.Recipe.ingredients);
  }
}

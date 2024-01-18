import { Output } from '@angular/core';
import { Component, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe','This is simply a Test ','https://dcassetcdn.com/design_img/10150/1680/1680_298517_10150_image.jpg'),
    new Recipe('A Another Test Recipe','This is simply a Test ','https://dcassetcdn.com/design_img/10150/1680/1680_298517_10150_image.jpg'),
    new Recipe('A Test Recipe','This is simply a Test ','https://dcassetcdn.com/design_img/10150/1680/1680_298517_10150_image.jpg')
  ];
  

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe)
  }
}

import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.model';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  Recipe!: Recipe;
  id!: number;

  r!: FormGroup;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.Recipe = this.recipeService.getRecipe(this.id);
    })
  }
  onAddToShoppingList() {

    this.recipeService.addIngredientsToShoppingList(this.Recipe.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'])
  }
}

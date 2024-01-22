import { Ingredient } from './../shared/ingredients.model';
import { Component } from '@angular/core';
import { ShoppingListServices } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients !: Ingredient[]

  constructor(private slService: ShoppingListServices) { }
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }


}

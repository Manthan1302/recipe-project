import { Ingredient } from './../shared/ingredients.model';
import { Component } from '@angular/core';
import { ShoppingListServices } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients!: Ingredient[];
  private idChangedSub!: Subscription;

  constructor(private slService: ShoppingListServices) { }
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.idChangedSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.idChangedSub.unsubscribe();
  }

  onEditItem(index:number){
    this.slService.startEditing.next(index);
  }
}

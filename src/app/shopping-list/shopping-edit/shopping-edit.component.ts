import { ShoppingListServices } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputref!: ElementRef;
  @ViewChild('amountInput') amountInputref!: ElementRef;

  constructor(private slService: ShoppingListServices) { }

  onAddItem() {
    console.log(this.nameInputref);

    const newIngredient = new Ingredient(this.nameInputref.nativeElement.value, this.amountInputref.nativeElement.value)
    this.slService.addIngrediant(newIngredient);
  }
}

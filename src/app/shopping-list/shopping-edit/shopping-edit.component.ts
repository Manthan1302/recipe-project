import { Ingredient } from './../../shared/ingredients.model';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputref! : ElementRef;
  @ViewChild('amountInput') amountInputref! : ElementRef;
  @Output() IngredientAdded = new EventEmitter<Ingredient>();
  
  onAddItem(){
    console.log(this.nameInputref);
    
    const newIngredient = new Ingredient(this.nameInputref.nativeElement.value,this.amountInputref.nativeElement.value)
    this.IngredientAdded.emit(newIngredient);
  }
}

import { NgForm } from '@angular/forms';
import { ShoppingListServices } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  subscription !: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedIItem!: Ingredient;
  @ViewChild('f') shoppingListForm!: NgForm;
  constructor(private slService: ShoppingListServices) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index
        this.editMode = true;
        this.editedIItem = this.slService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedIItem.name,
          amount: this.editedIItem.amount
        })
      }
    );
  }
  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount)
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else {
      this.slService.addIngrediant(newIngredient)
    }
    this.editMode = false;
    form.reset()
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }
  onClear(){
    this.shoppingListForm.reset();
    this.editMode= false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }
}

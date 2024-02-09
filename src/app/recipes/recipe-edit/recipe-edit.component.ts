import { Ingredient } from './../../shared/ingredients.model';
import { RecipeService } from './../recipe.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {

  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private router:Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      // console.log(this.editMode);

    });
    this.initForm();
  }

  onSubmit() {

    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    ])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {

        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImg, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  getcontrols() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    )
  }


  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}

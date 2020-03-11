import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { PostRecipeRequestAction, PutRecipeRequestAction } from '../../actions/recipe-detail.actions';
import { IngredientModel } from '../../models/api/ingredient.model';
import { RecipeModel } from '../../models/api/recipe.model';
import { AppStateModel } from '../../models/helper/app-state.model';
import { RecipeDialogDataModel } from '../../models/helper/recipe-dialog-data.model';
import { $authorsData } from '../../selectors/authors.selectors';
import { $recipeById } from '../../selectors/recipe-detail.selectors';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

enum RecipeFormKey {
  Title = 'Title',
  Authors = 'Authors',
  Ingredients = 'Ingredients',
  Text = 'Text',
  Image = 'Image',
  Difficulty = 'Difficulty',
  Tags = 'Tags'
}

enum IngredientFormKey {
  Name = 'Name',
  Amount = 'Amount',
  Unit = 'Unit',
}

@Component({
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  readonly RecipeFormKey = RecipeFormKey;
  readonly IngredientFormKey = IngredientFormKey;
  recipeForm: FormGroup;
  // Chips for tags
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly authorsData$ = this.store.pipe(select($authorsData));

  constructor(@Inject(MAT_DIALOG_DATA) public readonly dialogData: RecipeDialogDataModel,
    private readonly dialogRef: MatDialogRef<RecipeFormComponent>,
    private readonly store: Store<AppStateModel>,
    private readonly fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    const { recipeId } = this.dialogData;
    const recipe = recipeId != null ?
      await this.store
        .pipe(select($recipeById(recipeId)), take(1))
        .toPromise() :
      null;

    this.recipeForm = this.fb.group({
      [RecipeFormKey.Title]: [recipe != null ? recipe.title : '', Validators.required],
      [RecipeFormKey.Authors]: [recipe != null ? recipe.authorIds : [], Validators.required],
      [RecipeFormKey.Ingredients]: this.fb.array(
        (recipe != null ? recipe.ingredients : [])
          .map(this.createIngredientGroup)
      ),
      [RecipeFormKey.Text]: [recipe != null ? recipe.text : '', Validators.required],
      [RecipeFormKey.Image]: recipe != null ? recipe.imageUrl : '',
      [RecipeFormKey.Difficulty]: [recipe != null ? recipe.difficulty : '', [Validators.required, Validators.min(0), Validators.max(10)]],
      [RecipeFormKey.Tags]: [recipe != null ? recipe.tags : []]
    });
  }

  addIngredient(): void {
    (this.recipeForm.get(RecipeFormKey.Ingredients) as FormArray)
      .push(this.createIngredientGroup());
  }

  removeIngredient(index: number): void {
    (this.recipeForm.get(RecipeFormKey.Ingredients) as FormArray)
      .removeAt(index);
  }

  identifyIngredient(index: number): number {
    return index;
  }

  submitRecipe(): void {
    const { value } = this.recipeForm;
    const recipe: RecipeModel = {
      title: value[RecipeFormKey.Title],
      authorIds: value[RecipeFormKey.Authors],
      ingredients: value[RecipeFormKey.Ingredients]
        .map((ingredientValue): IngredientModel => ({
          name: ingredientValue[IngredientFormKey.Name],
          amount: ingredientValue[IngredientFormKey.Amount],
          ...ingredientValue[IngredientFormKey.Amount] && {
            unit: ingredientValue[IngredientFormKey.Amount]
          }
        })),
      text: value[RecipeFormKey.Text],
      imageUrl: value[RecipeFormKey.Image],
      difficulty: value[RecipeFormKey.Difficulty], //TODO: last task -> EXTENDING RECIPES MODEL AND ADD FILTERING+
      tags: value[RecipeFormKey.Tags] //TODO: last task -> EXTENDING RECIPES MODEL AND ADD FILTERING
    };
    // TODO: Delete after testing
    console.log(recipe);

    const { recipeId } = this.dialogData;
    this.store.dispatch(
      recipeId != null ?
        new PutRecipeRequestAction(recipeId, recipe) :
        new PostRecipeRequestAction(recipe)
    );
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private createIngredientGroup(ingredient?: IngredientModel): FormGroup {
    return this.fb.group({
      [IngredientFormKey.Name]: ingredient != null ? ingredient.name : '',
      [IngredientFormKey.Amount]: ingredient != null ? ingredient.amount : '',
      [IngredientFormKey.Unit]: ingredient != null ? ingredient.unit || '' : '',
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.recipeForm.value[RecipeFormKey.Tags].push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.recipeForm.value[RecipeFormKey.Tags].indexOf(tag);

    if (index >= 0) {
      this.recipeForm.value[RecipeFormKey.Tags].splice(index, 1);
    }
  }
}

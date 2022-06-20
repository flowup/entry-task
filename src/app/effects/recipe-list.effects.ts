import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { GetRecipesRequestAction, GetRecipesSuccessAction } from '../actions/recipe-list.actions';
import { RoutePath, whenNavigated } from '../app-utils';
import { SimpleRecipeModel } from '../models/api/simple-recipe.model';

@Injectable()
export class RecipeListEffects {
   readonly requireRecipes$ = createEffect(() => this.actions$.pipe(
    whenNavigated(({view, id}) => (
      (view === RoutePath.Recipes && id == null) ||
      (view === RoutePath.Authors) ?
        new GetRecipesRequestAction() :
        null
    ))
  ));

   readonly getRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(GetRecipesRequestAction.type),
    switchMap(() => this.http.get<SimpleRecipeModel[]>('/recipes').pipe(
      map(recipes => new GetRecipesSuccessAction(recipes))
    ))
  ));

  constructor(private readonly actions$: Actions,
              private readonly http: HttpClient) { }
}

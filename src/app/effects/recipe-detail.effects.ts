import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  GetRecipeFailureAction,
  GetRecipeRequestAction,
  GetRecipeSuccessAction,
  PostRecipeRequestAction,
  PostRecipeSuccessAction
} from '../actions/recipe-detail.actions';
import { RoutePath, whenNavigated } from '../app-utils';
import { RecipeModel } from '../models/api/recipe.model';

@Injectable()
export class RecipeDetailEffects {
   readonly requireRecipeById$ = createEffect(() => this.actions$.pipe(
    whenNavigated(({view, id}) => (
      view === RoutePath.Recipes && id != null ?
        new GetRecipeRequestAction(id) :
        null
    ))
  ));

   readonly getRecipeById$ = createEffect(() => this.actions$.pipe(
    ofType(GetRecipeRequestAction.type),
    switchMap(({id}: GetRecipeRequestAction) => this.http.get<RecipeModel>(`/recipes/${id}`).pipe(
      map(recipe => new GetRecipeSuccessAction(recipe)),
      catchError(() => of(new GetRecipeFailureAction(id)))
    ))
  ));

   readonly postRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(PostRecipeRequestAction.type),
    switchMap(({recipe}: PostRecipeRequestAction) => this.http.post<RecipeModel>('/recipes', recipe).pipe(
      map(response => new PostRecipeSuccessAction(response))
    ))
  ));

  constructor(private readonly actions$: Actions,
              private readonly http: HttpClient) { }
}

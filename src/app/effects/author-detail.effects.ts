import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import {
    PostNewAuthorRequestAction,
    PostNewAuthorSuccessAction
} from '../actions/author-detail.actions';
import { AuthorModel } from '../models/api/author.model';

@Injectable()
export class AurhorDetailEffects {

    @Effect() readonly postRecipe$ = this.actions$.pipe(
        ofType(PostNewAuthorRequestAction.type),
        switchMap(({ author }: PostNewAuthorRequestAction) => this.http.post<AuthorModel>('/authors', author).pipe(
            map(response => new PostNewAuthorSuccessAction(response)),
            tap(() => alert(JSON.stringify(author)))
        ))
    );

    constructor(private readonly actions$: Actions,
        private readonly http: HttpClient) { }
}
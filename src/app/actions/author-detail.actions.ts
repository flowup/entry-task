import { Action } from '@ngrx/store';
import { AuthorModel } from '../models/api/author.model';

export class PostNewAuthorRequestAction implements Action {
    static readonly type = 'PostNewAuthorRequest';
    readonly type = PostNewAuthorRequestAction.type;

    constructor(public readonly author: AuthorModel) { }
}

export class PostNewAuthorSuccessAction implements Action {
    static readonly type = 'PostNewAuthorSuccess';
    readonly type = PostNewAuthorSuccessAction.type;

    constructor(public readonly author: AuthorModel) { }
}

export type AuthorDetailActions
    = PostNewAuthorRequestAction
    | PostNewAuthorSuccessAction;
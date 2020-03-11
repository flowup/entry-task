import { AuthorDetailState } from '../models/helper/app-state.model';
import { AuthorDetailActions, PostNewAuthorRequestAction, PostNewAuthorSuccessAction } from '../actions/author-detail.actions';

const INITIAL_STATE: AuthorDetailState = {
    data: {},
    loading: false
};

export function authorDetailReducer(state: AuthorDetailState = INITIAL_STATE,
    action: AuthorDetailActions): AuthorDetailState {
    switch (action.type) {
        case PostNewAuthorRequestAction.type:
            return {
                ...state,
                loading: true
            };
        case PostNewAuthorSuccessAction.type:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.author.id!]: action.author
                },
                loading: false
            }
        default:
            return state;
    }
}
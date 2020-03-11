import { ActionReducerMap } from '@ngrx/store';
import { AppStateModel } from '../models/helper/app-state.model';
import { recipeListReducer } from './recipe-list.reducer';
import { recipeDetailReducer } from './recipe-detail.reducer';
import { authorsReducer } from './authors.reducer';
import { authorDetailReducer } from './author-detail.reducer'
import { routeReducer } from './route.reducer';
import { scrollReducer } from './scroll.reducer';

export const REDUCERS: ActionReducerMap<AppStateModel> = {
  recipeList: recipeListReducer,
  recipeDetail: recipeDetailReducer,
  authors: authorsReducer,
  authorDetail: authorDetailReducer,
  route: routeReducer,
  scroll: scrollReducer,
};

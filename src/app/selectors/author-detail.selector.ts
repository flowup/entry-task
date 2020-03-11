import { AppStateModel } from '../models/helper/app-state.model';
import { createSelector } from '@ngrx/store';
import { $routeId, $routeView } from './route.selectors';
import { AuthorModel } from '../models/api/author.model';
import { IdMapModel } from '../models/helper/id-map.model';

const $authorDetail = ({ authorDetail }: AppStateModel) => authorDetail;

export const $authorDetailLoading = createSelector(
    $authorDetail,
    ({ loading }): boolean => loading
);

export const $authorDetailData = createSelector(
    $authorDetail,
    ({ data }): IdMapModel<AuthorModel> => data
);

export const $recipeDetailLoaded = createSelector(
    $authorDetailLoading,
    (loading): boolean => !loading
);
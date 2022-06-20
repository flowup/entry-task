import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutePath } from './app-utils';
import { RecipeDetailGuard } from './guards/recipe-detail.guard';

const routes: Routes = [
  {
    path: `${RoutePath.Recipes}/:id`,
    loadChildren: () => import('./views/recipe-detail/recipe-detail-view.module').then(m => m.RecipeDetailViewModule),
    canActivate: [RecipeDetailGuard]
  },
  {
    path: `${RoutePath.Recipes}`,
    loadChildren: () => import('./views/recipes/recipes-view.module').then(m => m.RecipesViewModule)
  },
  {
    path: `${RoutePath.Authors}`,
    loadChildren: () => import('./views/authors/authors-view.module').then(m => m.AuthorsViewModule)
  },
  {
    path: '**',
    redirectTo: RoutePath.Recipes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    RecipeDetailGuard,
  ]
})
export class AppRoutingModule { }

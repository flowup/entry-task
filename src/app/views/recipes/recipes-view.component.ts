import { Component, OnInit } from '@angular/core';
import { AppStateModel } from '../../models/helper/app-state.model';
import { select, Store } from '@ngrx/store';
import { $recipeListData } from '../../selectors/recipe-list.selectors';
import { RoutePath } from 'src/app/app-utils';
import { FormControl } from '@angular/forms';
import { SimpleRecipeModel } from 'src/app/models/api/simple-recipe.model';
import { Observable } from 'rxjs';

enum Difficulty {
  Asc,
  Desc
}

@Component({
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.scss']
})
export class RecipesViewComponent implements OnInit {
  readonly RoutePath = RoutePath;

  // Selected tags in filter
  tags = new FormControl();
  // Unique tags used in mat select
  tagList = new Set();

  difficultySort: Difficulty = Difficulty.Desc;

  readonly $recipesData: Observable<SimpleRecipeModel[]> = this.store.pipe(select($recipeListData));
  filteredData: SimpleRecipeModel[];

  constructor(private readonly store: Store<AppStateModel>) { }

  ngOnInit(): void {
    this.$recipesData.subscribe(data => {
      // return from store
      this.filteredData = data;
      // unique tags from store
      for (let recipe of data)
        recipe.tags.forEach(element => this.tagList.add(element));

      // select all tags in mat select by default
      this.tags.setValue(Array.from(this.tagList));
      this.filterByDifficulty();
    });
  }

  // sort every recipe by selected tags
  filterByTag(): void {
    this.$recipesData.subscribe(data => {
      data = this.findTagInRecipe(data);
      this.filteredData = data;
    });
  }

  findTagInRecipe(recipes: SimpleRecipeModel[]): SimpleRecipeModel[] {
    let filtered: SimpleRecipeModel[] = [];
    // Check every tag of every recipe with selected tags in filter
    for (let recipe of recipes) {
      recipe.tags.forEach(tag => {
        for (let selected of this.tags.value) {
          if (tag === selected) {
            filtered.push(recipe);
            break;
          }
        }
      });
    }
    // Return only unique values
    return filtered.filter((v, i, a) => a.indexOf(v) === i);
  }

  filterByDifficulty(): void {
    this.difficultySort++;
    if (this.difficultySort === 2) this.difficultySort = Difficulty.Asc;
    this.difficultySort === 0 ?
      this.filteredData = this.filteredData.sort((a, b) => a.difficulty - b.difficulty)
      : this.filteredData = this.filteredData.sort((a, b) => b.difficulty - a.difficulty)

    console.log(this.filteredData)
  }
}

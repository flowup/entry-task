import { Component } from '@angular/core';
import { RoutePath } from 'src/app/app-utils';
import { MatDialog } from '@angular/material';
import { RecipeDialogDataModel } from 'src/app/models/helper/recipe-dialog-data.model';
import { RecipeFormComponent } from 'src/app/modal-views/recipe-form/recipe-form.component';
import { AppStateModel } from 'src/app/models/helper/app-state.model';
import { Store, select } from '@ngrx/store';
import { $toolbarRaised } from 'src/app/selectors/scroll.selectors';
import { AuthorFormComponent } from 'src/app/modal-views/author-form/author-form.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  readonly RoutePath = RoutePath;
  readonly toolbarRaised$ = this.store.pipe(select($toolbarRaised));

  constructor(private readonly dialog: MatDialog,
    private readonly store: Store<AppStateModel>) { }

  showNewRecipeDialog(): void {
    const dialogData: RecipeDialogDataModel = {};
    this.dialog.open(
      RecipeFormComponent,
      {
        disableClose: true,
        data: dialogData,
        maxHeight: '90vh'
      }
    );
  }

  showNewAuthorDialog(): void {
    const dialogData: RecipeDialogDataModel = {};
    this.dialog.open(
      AuthorFormComponent,
      { disableClose: true, data: dialogData }
    );
  }
}

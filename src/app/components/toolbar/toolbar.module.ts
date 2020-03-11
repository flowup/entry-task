import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatButtonModule, MatIconModule, MatTooltipModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RecipeFormModule } from 'src/app/modal-views/recipe-form/recipe-form.module';
import { AuthorFormModule } from 'src/app/modal-views/author-form/author-form.module';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    RecipeFormModule,
    AuthorFormModule
  ]
})
export class ToolbarModule { }

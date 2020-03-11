import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatDividerModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AuthorNamesModule } from '../../pipes/author-names/author-names.module';
import { RecipesViewComponent } from './recipes-view.component';
import { RecipesViewRoutingModule } from './recipes-view-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RecipesViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    RecipesViewRoutingModule,
    AuthorNamesModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class RecipesViewModule { }

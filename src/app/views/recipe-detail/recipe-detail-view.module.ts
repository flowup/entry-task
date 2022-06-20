import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FractionModule } from '../../pipes/fraction/fraction.module';
import { RecipeDetailViewComponent } from './recipe-detail-view.component';
import { UnpackModule } from '../../directives/unpack/unpack.module';
import { RecipeDetailViewRoutingModule } from './recipe-detail-view-routing.module';

@NgModule({
  declarations: [RecipeDetailViewComponent],
  imports: [
    CommonModule,
    RecipeDetailViewRoutingModule,
    UnpackModule,
    FractionModule,

    MatCardModule,
    MatTabsModule,
    MatTableModule,
  ]
})
export class RecipeDetailViewModule { }

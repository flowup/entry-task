import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsViewComponent } from './authors-view.component';
import { AuthorsViewRoutingModule } from './authors-view-routing.module';
import { MatTableModule, MatChipsModule } from '@angular/material';

@NgModule({
  declarations: [AuthorsViewComponent],
  imports: [
    CommonModule,
    AuthorsViewRoutingModule,
    MatTableModule,
    MatChipsModule
  ]
})
export class AuthorsViewModule { }

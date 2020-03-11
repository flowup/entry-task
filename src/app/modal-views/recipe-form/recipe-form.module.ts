import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagePickerModule } from '../../components/image-picker/image-picker.module';
import { RecipeFormComponent } from './recipe-form.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatChipsModule } from '@angular/material';

@NgModule({
  declarations: [RecipeFormComponent],
  entryComponents: [RecipeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    ImagePickerModule
  ]
})
export class RecipeFormModule { }

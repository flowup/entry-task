import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImagePickerComponent } from './image-picker.component';

@NgModule({
  declarations: [ImagePickerComponent],
  exports: [ImagePickerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ]
})
export class ImagePickerModule { }

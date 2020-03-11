import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorFormComponent } from './author-form.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthorFormComponent],
    entryComponents: [AuthorFormComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule
    ]
})
export class AuthorFormModule { }

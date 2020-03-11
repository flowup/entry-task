import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorDialogDataModel } from 'src/app/models/helper/author-dialog-data.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppStateModel } from 'src/app/models/helper/app-state.model';
import { Store } from '@ngrx/store';
import { AuthorModel } from 'src/app/models/api/author.model';
import { PostNewAuthorRequestAction } from 'src/app/actions/author-detail.actions';

enum AuthorFormKey {
    Name = 'Name',
    Email = 'Email',
    Skill = 'Skill'
}

@Component({
    templateUrl: './author-form.component.html',
    styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
    readonly AuthorFormKey = AuthorFormKey;
    authorForm: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public readonly dialogData: AuthorDialogDataModel,
        private readonly dialogRef: MatDialogRef<AuthorFormComponent>,
        private readonly store: Store<AppStateModel>,
        private readonly fb: FormBuilder) { }

    async ngOnInit(): Promise<void> {
        this.authorForm = this.fb.group({
            [AuthorFormKey.Name]: ['Test Testovic', [Validators.required, Validators.pattern('^[a-zA-Z]+\\s[a-zA-Z]+$')]],
            [AuthorFormKey.Email]: ['test.testovic@mail.com', [Validators.required, Validators.email]],
            [AuthorFormKey.Skill]: ['5', [Validators.required, Validators.min(0), Validators.max(10)]],
        });

        console.log(this.authorForm);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    submitAuthor(): void {
        console.log(this.authorForm.value);
        const { value } = this.authorForm;
        const author: AuthorModel = {
            id: 'unset',
            email: value[AuthorFormKey.Email],
            name: value[AuthorFormKey.Name],
            avatar: 'https://avataaars.io/',
            skill: value[AuthorFormKey.Skill]
        }

        this.store.dispatch(new PostNewAuthorRequestAction(author));
        //this.closeDialog(); // TODO: enable closing dialog after testing
    }

}
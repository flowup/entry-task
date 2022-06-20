import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { NotifyOfErrorAction, NotifyOfSuccessAction } from '../actions/notification.actions';

const SNACK_BAR_DURATION = 2000;

@Injectable()
export class NotificationEffects {
  @Effect({dispatch: false}) readonly notifyOfSuccess$ = this.actions$.pipe(
    ofType(NotifyOfSuccessAction.type),
    tap(({message}: NotifyOfSuccessAction) => {
      this.snackBar.open(message, 'Dismiss', {duration: SNACK_BAR_DURATION});
    })
  );

  @Effect({dispatch: false}) readonly notifyOfError$ = this.actions$.pipe(
    ofType(NotifyOfErrorAction.type),
    tap(({message}: NotifyOfErrorAction) => {
      this.snackBar.open(`ERROR: ${message}`, 'Dismiss', {duration: SNACK_BAR_DURATION});
    })
  );

  constructor(private readonly actions$: Actions,
              private readonly snackBar: MatSnackBar) { }
}

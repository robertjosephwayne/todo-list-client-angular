import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginCredentials } from '../models/login-credentials.model';
import { SignupInformation } from '../models/signup-information.model';
import { AppState } from '../store/app.state';
import * as AuthActions from '../store/auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
  ) { }

  login(loginCredentials: LoginCredentials): void {
    this.http.post<{ access_token: string; }>('https://todo-list-api-nest.herokuapp.com/auth/login', loginCredentials)
      .pipe(
        catchError((error) => {
          this.store.dispatch(AuthActions.loginFailure());
          return this.handleError(error);
        }),
      )
      .subscribe(response => {
        this.store.dispatch(AuthActions.loginSuccess({
          jwtToken: response.access_token
        }));
      });
  }

  signup(signupInformation: SignupInformation): void {
    this.http.post<{ access_token: string; }>('https://todo-list-api-nest.herokuapp.com/auth/signup', signupInformation)
      .pipe(
        catchError((error) => {
          this.store.dispatch(AuthActions.signupFailure());
          return this.handleError(error);
        }),
      )
      .subscribe(response => {
        this.store.dispatch(AuthActions.signupSuccess({
          jwtToken: response.access_token
        }));
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}



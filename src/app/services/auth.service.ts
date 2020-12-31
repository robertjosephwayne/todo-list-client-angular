import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

import { AppState } from '../store/app.state';

import * as AuthActions from '../store/auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string): void {
    this.http.post<{ token: string }>('http://localhost:3000/users/login', { email, password })
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(response => {
        this.store.dispatch(AuthActions.loginSuccess({
          jwtToken: response.token
        }));
      });
  }

  signup(email: string, password: string): void {
    this.http.post('http://localhost:3000/signup', { email, password })
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(response => {
        this.store.dispatch(AuthActions.signupSuccess());
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


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user';
import { HandleError, HttpErrorHandlerService } from './http-error-handler.service';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl = "https://63556b3a483f5d2df3b41568.mockapi.io/api/duocv1/users";
  private handleError: HandleError;
  response: any;


  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('UsersService')
  }

  /* GET user */
  getUser_(id: string): Observable<User> {

    const url = `${this.usersUrl}/${id}`;

    return this.http.get<User>(url).pipe(catchError(this.handleError<User>('searchUsers')));
  }

  getUser(id: string): Promise<any> {
    const url = `${this.usersUrl}/${id}`;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
          complete: () => console.log('complete.')
        });
    });
  }

  updateUser(idUser: string, user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.usersUrl + "/" + idUser, user)
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
          complete: () => console.log('complete.')
        });
    });
  };

}

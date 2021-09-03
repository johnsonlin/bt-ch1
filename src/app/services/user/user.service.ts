import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiBaseUrl } from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiBaseUrl = ApiBaseUrl;
  userLoading$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  getUsers() {
    this.userLoading$.next(true);
    return this.http.get(`${this.apiBaseUrl}/users`)
      .pipe(
        finalize(() => this.userLoading$.next(false)),
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseUrl } from '../../app.constants';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiBaseUrl = ApiBaseUrl;
  userPostsLoading$ = new BehaviorSubject(false);
  postCommentsLoading$ = new BehaviorSubject<boolean | number>(false);

  constructor(private http: HttpClient) {}

  getUserPosts(userId: number) {
    this.userPostsLoading$.next(true);
    return this.http.get(`${this.apiBaseUrl}/users/${userId}/posts`)
      .pipe(
        finalize(() => this.userPostsLoading$.next(false)),
      );
  }

  getPostComments(postId: number) {
    this.postCommentsLoading$.next(postId);
    return this.http.get(`${this.apiBaseUrl}/posts/${postId}/comments`)
      .pipe(
        finalize(() => this.postCommentsLoading$.next(false)),
      );
  }
}

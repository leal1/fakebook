import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from './model/post';
import { environment } from '../environments/environment';
import { Comment } from './model/comment';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  private postsUrl = environment.apiUrl+ '/posts';
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        catchError(this.handleError<Post[]>('Get Posts', []))
      );
  }
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions)
      .pipe(
        catchError(this.handleError<Post>('Create Post'))
      );
  }

  commentOnPost(postId: string, comment: Comment): Observable<Post> {
    return this.http.post<Post>(this.postsUrl + "/" + postId, comment, this.httpOptions)
      .pipe(
        catchError(this.handleError<Post>('Create Post'))
      );
  }

  likeOrUnlikePost(postId: string, userId: string): Observable<Post> {
    return this.http.put<Post>(this.postsUrl + "/" + postId, {userId: userId}, this.httpOptions)
      .pipe(
        catchError(this.handleError<Post>('Like or unlike Post'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 
      return of(result as T);
    };
  }
}

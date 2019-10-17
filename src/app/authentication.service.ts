import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './model/user';
import { environment } from '../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<User>;
    private httpHeaders: HttpHeaders  = new HttpHeaders({ 
        'Content-Type': 'application/json'
       }); // 


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        if(this.currentUserSubject.value) {
          return this.currentUserSubject.value.userWithoutHash;
        }
        return null;
    }

    public currentUserBehavior(): Observable<User> {
      return this.currentUserSubject.asObservable();
    }

    getCSRFToken() {
      // issue get request for CSRF token
      return this.http.get<any>(`${API_URL}/users/login`, {headers: this.httpHeaders, withCredentials: true});
    }

    login(username, password) {
        return this.http.post<any>(`${API_URL}/users/authenticate`, { username, password }, {headers: this.httpHeaders, withCredentials: true})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        console.log(this.currentUserValue);
    }
}
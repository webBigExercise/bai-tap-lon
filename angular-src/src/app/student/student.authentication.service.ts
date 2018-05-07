import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import {TokenPayLoad} from './student';

interface TokenResponse {
    token: string;
  }
  export interface TokenPayload {
    email: string;
    password: string;
  }
@Injectable()
export class StudentAuthenticationService {
    private token: string;
    constructor(private http: HttpClient, private router: Router) {}

    private saveToken(token: string): void {
        localStorage.setItem('student-Token', token);
        this.token = token;
    }

    private getToken(): string {
        if (!this.token) {
          this.token = localStorage.getItem('student-token');
        }
        return this.token;
    }

    public logout(): void {
        this.token = '';
        window.localStorage.removeItem('student-token');
        this.router.navigateByUrl('/');
    }

    private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
        let base;

        if (method === 'post') {
          base = this.http.post(`/app_api/${type}`, user);
        } else {
          base = this.http.get(`/app_api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
        }
        const request = base.pipe(
          map((data: TokenResponse) => {
            if (data.token) {
              this.saveToken(data.token);
            }
            return data;
          })
        );
        return request;
    }

    public register(user: TokenPayload): Observable<any> {
        return this.request('post', 'register', user);
    }

    public login(user: TokenPayload): Observable<any> {
        return this.request('post', 'login', user);
    }

    public profile(): Observable<any> {
        return this.request('get', 'profile');
    }
}

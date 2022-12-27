import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Token } from '../typings';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token = localStorage.getItem('token');
  baseURL2: string = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  login(user: UserModel) {
    const headers = {'content-type': 'application/json'}  
    return this.http.post<Token>(`${this.baseURL2}/auth`, user, {'headers': headers});
}

  logout() {
      localStorage.clear();
  }

  isAuthenticated(): Promise<boolean> {
      return new Promise((resolve) => {
          setTimeout(() => {
              this.token = localStorage.getItem('token');
              resolve(this.token !== null);
          }, 800);
      });
  }
}

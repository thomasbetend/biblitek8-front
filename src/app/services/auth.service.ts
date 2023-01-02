import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Profile, Token } from '../typings';
import { HttpClient } from "@angular/common/http";
import { StorageService } from './storage.service';

import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token = this.storageService.get('token');
  authUrl = environment.authUrl;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storageService: StorageService, private storage: Storage) { }

  login(user: UserModel) {
    const headers = {'content-type': 'application/json'};
    return this.http.post<Token>(`${this.authUrl}`, user, {'headers': headers});
}

  logout() {
      this.storage.clear().then((data) => {
        console.log('clear', data);
      });
      setTimeout(()=>{
        this.storage.get('token').then((data)=>{
          console.log('token3', data);
        })
      }, 1000);
  }

  isAuthenticated(): Promise<boolean> {
      return new Promise((resolve) => {
          setTimeout(() => {
              this.storage.get('token').then((val)=>{
                this.token = val;
                console.log('Token1', this.token);
              });
              console.log('Token2', this.token);
              resolve(this.token !== null);
          }, 800);
      });
  }

  getProfile(auth_token: string) {
    const headers = ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<Profile>(`${this.apiUrl}/me`, { 'headers' : headers});
  }

}

import { Component, OnInit } from '@angular/core';
import { ConfigToken } from '@ionic/angular/providers/config';
import { stringify } from 'querystring';
import { UserModel } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  user: UserModel = new UserModel();
  errorField?: boolean;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.errorField = false;
  }

  submitUser() {

    if(!this.user.email || !this.user.password) {
      this.errorField = true;
      return;
    }

    this.apiService.login(this.user!).subscribe((data)=>{
        console.log(data);
        localStorage.setItem('token', Object.values(data)[0]);
    })
  }

}

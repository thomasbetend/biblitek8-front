import { Component, OnInit } from '@angular/core';
import { ConfigToken } from '@ionic/angular/providers/config';
import { stringify } from 'querystring';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  user: UserModel = new UserModel();
  errorField?: boolean;
  errorConnexion?: boolean;

  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) {}

  ngOnInit() {
    this.errorField = false;
  }

  submitUser() {

    this.errorField = false;

    if(!this.user.email || !this.user.password) {
      this.errorField = true;
      return;
    }

    this.authService.login(this.user!)
      .subscribe({
        next: (data)=>{
          console.log(data);
          this.storageService.set('token', data.token);
          this.router.navigate(['/']);
        }, 
        error:(err)=>{
          console.log(err);
          this.errorConnexion = true;
        } 
      })
  }

}

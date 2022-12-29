import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  token?: string;
  postArray: any;
  pseudo?: string;
  avatar?: string;
  id?: number;
  imageUrl = "../../assets/images/";

  constructor(public modalCtrl: ModalController, public authService: AuthService, private router: Router, private apiService: ApiService, private storage: Storage) { 
    this.getPostsByUserId();
  }

  ngOnInit() {
    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        console.log(data);
        this.pseudo = data.pseudo;
        this.avatar = data.avatar;
        this.id = data.id;
      })
    });

    setTimeout(()=>{
      this.getPostsByUserId();
    }, 500);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getPostsByUserId() {
    if (!this.id) return;
    this.apiService.getPostsByUserId(this.id).subscribe((data)=>{
      console.log(data["hydra:member"]);
      this.postArray = data["hydra:member"];
    })
  }

}

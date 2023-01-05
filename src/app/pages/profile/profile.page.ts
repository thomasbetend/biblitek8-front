import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';


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
  posts: any;

  constructor(public modalCtrl: ModalController, public authService: AuthService, private router: Router, private apiService: ApiService, private storage: Storage) { 
  }

  ngOnInit() {
    this.getPosts();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getPosts() {
    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        this.pseudo = data.pseudo;
        this.avatar = data.avatar;
        this.id = data.id;
        console.log('>>>>>id2',this.id);

        if (!this.id) return;
        this.apiService.getPostsByUserId(this.id).subscribe((data)=>{
          console.log('dataPosts', data["hydra:member"]);
          this.postArray = data["hydra:member"];
        })
      });
    });
  };


}

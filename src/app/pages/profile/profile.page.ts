import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { firstValueFrom, lastValueFrom, switchMap } from 'rxjs';
import { resourceLimits } from 'worker_threads';
import { profile } from 'console';


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

      this.authService.getProfile(token).subscribe(
        (data : any) => {
          this.pseudo = data.pseudo;
          this.avatar = data.avatar;
        }
      )

      this.authService.getProfile(token)
        .pipe(
            (data: any) => this.apiService.getPostsByUserId(data.id)
        )
        .subscribe((data)=>{
          this.postArray = data["hydra:member"];
        })
      });
  };
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  token?: string;
  data: any;
  pseudo?: string;
  avatar?: string;
  imageUrl = "../../assets/images/";

  constructor(public authService: AuthService, private router: Router, private storageService: StorageService, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        console.log(data);
        this.pseudo = data.pseudo;
        this.avatar = data.avatar;
      })
    });

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

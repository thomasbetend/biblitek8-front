import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {

  post: PostModel = new PostModel();
  data: any;
  isPostSuccess = false;
  error = false;
  token?: string;
  id?: number;

  constructor(private apiService : ApiService, private router: Router, private authService: AuthService, private http: HttpClient, private storage: Storage) { }

  ngOnInit(): void { 
    this.error = false;
    this.isPostSuccess = false;
    this.getProfile();
  }

  getToken() {
    this.storage.get('token').then((val)=>{
      this.token = val;
    })
  }

  getProfile() {
    this.getToken();
    setTimeout(()=>{
      //console.log('token', this.token);
      if(!this.token) return;
      this.authService.getProfile(this.token).subscribe((data)=>{
        console.log(data);
        this.id = data.id;
        //console.log('id1', this.id);
      });
    }, 1000)

  }

  addPost() {
    if (!this.post.description || !this.post.image) {
      this.error = true;
      console.log(this.error);
      return;
    }

    this.getProfile();
    
    // this.post.user.id = this.id;

    this.apiService.addPost(this.post!).subscribe({
      next: (data)=>{
        console.log(data);
        this.router.navigate(['/']);
        this.isPostSuccess = true;
      }, 
      error:(err)=>{
        console.log(err);
        this.isPostSuccess = false;
      } 
    });
  }

}

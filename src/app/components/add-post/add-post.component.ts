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
  isPostFailed = false;
  errorFields = false;
  token?: string;
  id?: number;

  constructor(private apiService : ApiService, private router: Router, private authService: AuthService, private http: HttpClient, private storage: Storage) { }

  ngOnInit(): void { 
    this.errorFields = false;
    this.isPostFailed = false;
    this.getProfile();
    this.post.description = '';
    this.post.image = '';
  }

  getToken() {
    this.storage.get('token').then((val)=>{
      this.token = val;
    })
  }

  getProfile() {
    this.getToken();
    setTimeout(()=>{
      if(!this.token) return;
      this.authService.getProfile(this.token).subscribe((data)=>{
        console.log(data);
        this.id = data.id;
      });
    }, 1000)
  }

  addPost() {
    if (!this.post.description || !this.post.image) {
      this.errorFields = true;
      console.log(this.errorFields);
      return;
    }

    this.getProfile();

    this.post.user = `/api/users/${this.id}`;
    
    this.apiService.addPost(this.post!).subscribe({
      next: (data)=>{
        console.log(data);
        this.router.navigate(['/']);
        this.isPostFailed = false;
      }, 
      error:(err)=>{
        console.log(err);
        this.isPostFailed = true;
      } 
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

import { Storage } from '@ionic/storage-angular';
import { LikeModel } from 'src/app/models/like.model';
import { Like2, Post, Post3 } from 'src/app/typings';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {

  post = new PostModel();
  lastPost?: any;
  data: any;
  isPostFailed = false;
  errorFields = false;
  token?: string;
  id: number | undefined;
  like = new LikeModel();

  constructor(private apiService : ApiService, private router: Router, private authService: AuthService, private http: HttpClient, private storage: Storage) { }

  ngOnInit(): void { 
    this.errorFields = false;
    this.isPostFailed = false;
    this.getProfile();

    if (!this.post) return;
    this.post.description = '';
    this.post.image = '';
  }

  getProfile() {
    this.storage.get('token').then((val)=>{
      this.token = val;
      if(!this.token) return;
      this.authService.getProfile(this.token).subscribe((data)=>{
        this.id = data.id;

        console.log('id>>>', this.id);

      });
    })
  }

  addPost() {
    if (!this.post) {
      this.errorFields = true;
      console.log(this.errorFields);
      return;
    }
    
    this.getProfile();

    if (!this.post.user) {
      this.post.user = {
        id: this.id,
      };
    }

    this.post.date = this.apiService.formatDate(new Date());
    this.apiService.addPost(this.post).subscribe({
      next: (data)=>{
        console.log(data);

        this.apiService.getPostsList().subscribe((data)=>{
          this.lastPost = data['hydra:member'][0];
          console.log('lastPost id', this.lastPost.id);

          if (!this.like.user) {
            this.like.user = {
              id: this.id,
            };
          }
          if (!this.like.postShare) {
            this.like.postShare = {
              id: this.lastPost.id,
            };
          }

          this.like.total = 0;
          this.apiService.initializeLikeOnPost(this.like).subscribe((data)=>{
            console.log('like initialized', data);
          });
        });

        this.router.navigate(['/']);
        this.isPostFailed = false;
      }, 
      error:(err)=>{
        console.log(err);
        this.isPostFailed = true;
      } 
    });

    this.post.image = '';
    this.post.description = '';

  }

}

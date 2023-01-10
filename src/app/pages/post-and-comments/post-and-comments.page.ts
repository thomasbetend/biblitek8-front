import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentModel } from 'src/app/models/comment.model';
import { ApiService } from 'src/app/services/api.service';
import { Post, Post2 } from 'src/app/typings';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-and-comments',
  templateUrl: './post-and-comments.page.html',
  styleUrls: ['./post-and-comments.page.scss'],
})
export class PostAndCommentsPage implements OnInit {

  postId?: number;
  userId?: any;
  data: any;
  postGetted?: Post;
  post2?: Post2;
  comment: CommentModel = new CommentModel();
  commentContent?: string;
  imageUrl = environment.imageUrl;
  token?: string;


  constructor(public authService: AuthService, private storage: Storage, private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) { 
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() { 
    this.getCommentsByPostId();

    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        console.log('user_id', data);
        this.userId = data.id;
      })
    });
  }

  getCommentsByPostId() {
    if (!this.postId) return;
    this.apiService.getPostsByPostId2(this.postId).subscribe((post)=>{
      this.postGetted = post;
      console.log(this.postGetted);

      if (!this.postId) return;
      this.apiService.getCommentsByPostId(this.postId).subscribe((data)=>{
        this.data = data["hydra:member"];
        console.log('comments', this.data);
      });
    });
  }

  addComment() {
    if (!this.postGetted) return;
    this.comment.postShare = `/api/post_shares/${this.postGetted.id}`;
    if (!this.userId) return;
    this.comment.user = `/api/users/${this.userId}`;
    this.comment.content = this.commentContent;
    this.comment.date = this.apiService.formatDate(new Date());
      this.apiService.addComment(this.comment).subscribe((comment)=>{
    });
    this.commentContent ='';
    this.getCommentsByPostId();
  }

}

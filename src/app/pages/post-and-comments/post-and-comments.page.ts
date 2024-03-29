import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentModel } from 'src/app/models/comment.model';
import { ApiService } from 'src/app/services/api.service';
import { Post, Post2 } from 'src/app/typings';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs';

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
    this.getPostsByPostId();
    this.getCommentsByPostId();

    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        console.log('user_id', data);
        this.userId = data.id;
      })
    });
  }

  getPostsByPostId() {
    if (!this.postId) return;
    this.apiService.getPostsByPostId2(this.postId).subscribe((post)=>{
      this.postGetted = post;
      console.log('postGetted', this.postGetted);
    });
  }

  getCommentsByPostId() {
    if (!this.postId) return;
    console.log(this.postId);
      this.apiService.getCommentsByPostId(this.postId).subscribe((data)=>{
        this.data = data["hydra:member"];
        console.log('comments getted....', this.data);
    });
  }

  addComment() {

    if (!this.postGetted) return;
    if (!this.comment.postShare) {
      this.comment.postShare = {
        id: this.postGetted.id,
      };
    }

    if (!this.userId) return;
    if (!this.comment.user) {
      this.comment.user = {
        id: this.userId,
      };
    }

    this.comment.content = this.commentContent;
    this.comment.date = this.apiService.formatDate(new Date());

    this.apiService.addComment(this.comment)
      .pipe(
        mergeMap(
          (data: any) => this.apiService.getCommentsByPostId(data.postShare.id)
        )
      )
      .subscribe((data)=>{
        this.data = data["hydra:member"];
    });

    this.commentContent ='';

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentModel } from 'src/app/models/comment.model';
import { ApiService } from 'src/app/services/api.service';
import { Post, Post2 } from 'src/app/typings';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-and-comments',
  templateUrl: './post-and-comments.page.html',
  styleUrls: ['./post-and-comments.page.scss'],
})
export class PostAndCommentsPage implements OnInit {

  id?: number;
  user_id?: any;
  data: any;
  post1?: Post;
  post2?: Post2;
  comment: CommentModel = new CommentModel();
  commentContent?: string;
  imageUrl = "../../assets/images/";
  token?: string;


  constructor(public authService: AuthService, private storage: Storage, private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getCommentsByPostId();
    this.getPostByPostId();

    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        console.log('user_id', data);
        this.user_id = data.id;
      })
    });
  }

  getCommentsByPostId() {
    console.log('id comments', this.id);
    if (!this.id) return;
    this.apiService.getCommentsByPostId(this.id).subscribe((data)=>{
      this.data = data["hydra:member"];
      console.log('comments', this.data);
    })
  }

  getPostByPostId() {
    if (!this.id) return;
    this.apiService.getPostsByPostId2(this.id).subscribe((post)=>{
      this.post1 = post;
      console.log(this.post1);
    })
  }

  addComment() {
    this.comment.postShare = `/api/post_shares/${this.id}`;
    if (!this.comment.user) return;
    if (!this.user_id) return;
    this.comment.user = `/api/users/${this.user_id}`;
    this.comment.content = this.commentContent;
    this.comment.date = this.apiService.formatDate(new Date());
    // console.log('comment_posted', this.comment);
    // console.log(this.user_id);
      this.apiService.addComment(this.comment).subscribe((comment)=>{
      // console.log(comment);
    });
    this.router.navigate(["/post-and-comments", this.id]);
  }

}

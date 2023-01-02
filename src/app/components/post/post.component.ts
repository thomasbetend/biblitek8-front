import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/typings';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { LikeModel } from 'src/app/models/like.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data?: any;
  @Input() post?: Post;
  @Input() id?: string ;
  imageUrl = "../../assets/images/";
  like?: number;
  likeUser = 0;
  likeUpdate: LikeModel = new LikeModel() ;
  token?: string;
  avatar?: string;
  pseudo?:string;
  @Output() showComments = new EventEmitter<number>();

  constructor(private apiService: ApiService, private authService: AuthService, private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
    this.getLikeByPostId();
    console.log('refresh page');
  }

  getLikeByPostId() {
    if (!this.post) return;
    this.apiService.getLikesByPostId(this.post?.id).subscribe((data)=>{
      console.log('Likes', data);
      this.like = data['hydra:member'][0].total;
      this.likeUpdate.id = data['hydra:member'][0].id;
    })
  }

  addLike() {
    console.log('like', this.like);    
    if (this.likeUser === 0) {
      this.likeUser++;
      if(!this.like) {
        this.like = 1;
      } else {
        this.like += this.likeUser;
        console.log(this.like);
      }
    } else {
      this.likeUser--;
      if(!this.like) return;
      this.like--;
    }
    if (!this.post) return;
    this.likeUpdate.postShare = `/api/post_shares/${this.post.id}`;
    this.likeUpdate.total = this.like;
    this.apiService.upDateLikeOnPostByPostId(this.post?.id, this.likeUpdate).subscribe((data)=>{
      console.log(data);
    });
  }

  getToken() {
    this.storage.get('token').then((val)=>{
      this.token = val;
    })
  }

  onClickShowComments() {
    if (!this.post) return;
    console.log(this.post);
    this.showComments.emit(this.post.id);
  }

}

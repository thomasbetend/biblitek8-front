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
  @Input() userId?: number;
  imageUrl = "../../assets/images/";
  like?: number;
  likeId?: number;
  likeUser = 0;
  likeUpdate: LikeModel = new LikeModel() ;
  token?: string;
  avatar?: string;
  pseudo?:string;
  @Output() showComments = new EventEmitter<number>();

  constructor(private apiService: ApiService, private authService: AuthService, private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
    this.getLikeByPostId();
    this.getLikeIdByUserAndPost();
  }

  getLikeByPostId() {
    if (!this.post) return;
    this.apiService.getLikesByPostId(this.post?.id).subscribe((data)=>{
      let totalLike = 0;
      data['hydra:member'].forEach((element)=>{
        if (element.total === 1) totalLike += 1;
      });
      this.like = totalLike;
    });
  }

  getLikeIdByUserAndPost() {

    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        this.userId = data.id;
        console.log(this.userId);

        if (!this.post) return;
        console.log('post',this.post.id);
        this.apiService.getLikeIdByUserAndPost(this.post?.id, this.userId).subscribe((data)=>{
          console.log('likeId', data);
          if (!data["hydra:member"]) this.likeId === undefined;
          this.likeId = data["hydra:member"][0].id;
        });
      });
    });
  } 

  addLike() {
    if (this.likeUser === 0) {
      this.likeUser++;
      if(!this.like) {
        this.like = 1;
      } else {
        this.like += this.likeUser;
      }
    } else {
      this.likeUser--;
      if(!this.like) return;
      this.like--;
    }

    if (!this.likeUpdate.user) {
      this.likeUpdate.user = {
        id: this.userId,
      };
    }

    if (!this.post) return;
    if (!this.likeUpdate.postShare) {
      this.likeUpdate.postShare = {
        id: this.post.id,
      };
    }

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

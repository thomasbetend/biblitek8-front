import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/typings';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { LikeModel } from 'src/app/models/like.model';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data?: any;
  @Input() post?: any;
  @Input() id?: string ;
  @Input() userId?: number;
  imageUrl = "../../assets/images/";
  like?: number;
  likeId?: number;
  likeTotal?: number;
  likeUser?: number;
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

      this.authService.getProfile(token)
        .pipe(
          mergeMap(
            (data: any) => this.apiService.getLikeIdByUserAndPost(this.post?.id, data.id)
          )
        )
        .subscribe((data)=>{
          //console.log('likeId', data);
          if (data["hydra:member"] === undefined) {
            this.likeId === undefined;
          } else {
            this.likeId = data["hydra:member"][0].id;
            this.likeTotal = data["hydra:member"][0].total;
          }
        });
      });
  } 

  addLike() {

    if (this.likeId === undefined || this.likeTotal === 0) {
      this.likeUser = 1;
    } else if (this.likeTotal === 1){
      this.likeUser = 0;
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

    this.likeUpdate.total = this.likeUser;

    if (this.likeId === undefined) {
      console.log(`total : ${this.likeTotal}, likeUser : ${this.likeUser}`);
      this.apiService.initializeLikeOnPost(this.likeUpdate).subscribe((data)=>{
        console.log('likeUpdate 1', data);

        this.getLikeByPostId();
        this.getLikeIdByUserAndPost();
      });
    } else {
      console.log('defined');
      console.log(`total : ${this.likeTotal}, likeUser : ${this.likeUser}`);
      this.apiService.upDateLikeOnPostByPostId(this.likeId, this.likeUpdate).subscribe((data)=>{
        console.log('likeUpdate 2', data);

        this.getLikeByPostId();
        this.getLikeIdByUserAndPost();
      });
    }

    //this.getLikeByPostId();
    //this.getLikeIdByUserAndPost();
  }

  getToken() {
    this.storage.get('token').then((val)=>{
      this.token = val;
    })
  }

  onClickShowComments() {
    if (!this.post) return;
    //console.log(this.post);
    this.showComments.emit(this.post.id);
  }

}

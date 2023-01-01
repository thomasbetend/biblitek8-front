import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/typings';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';

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
  like: number = 0;
  token?: string;
  avatar?: string;
  pseudo?:string;
  @Output() showComments = new EventEmitter<number>();

  constructor(private apiService: ApiService, private authService: AuthService, private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
    this.getLikeByPostId();
  }

  getLikeByPostId() {
    if (!this.post) return;
    this.apiService.getLikesByPostId(this.post?.id).subscribe((data)=>{
      console.log('Likes', data);
      this.like = data['hydra:member'][0].total;
    })
  }

  addLike() {
    this.getLikeByPostId();
    
    if (this.like === 0) {
      this.like++;
    } else {
      if(!this.like) return;
      this.like--;
    }

    console.log(this.like);
    console.log(this.post);

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

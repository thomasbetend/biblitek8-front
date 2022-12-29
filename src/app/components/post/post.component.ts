import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/typings';
import { Storage } from '@ionic/storage-angular';

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

  constructor(private authService: AuthService, private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
  }

  addLike() {
    
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

}

import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/typings';
import { PostListComponent } from '../post-list/post-list.component';

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

  constructor() { }

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
  }

}

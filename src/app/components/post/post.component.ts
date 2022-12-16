import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/typings';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post?: Post;
  like?: number;

  constructor() { }

  ngOnInit() {}


  addLike() {
    if (this.like === 0) {
      this.like++;
    } else {
      this.like--;
    }
  }

}

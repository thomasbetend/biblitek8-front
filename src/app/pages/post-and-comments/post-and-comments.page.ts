import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Post } from 'src/app/typings';

@Component({
  selector: 'app-post-and-comments',
  templateUrl: './post-and-comments.page.html',
  styleUrls: ['./post-and-comments.page.scss'],
})
export class PostAndCommentsPage implements OnInit {

  id?: number;
  data: any;
  post?: Post;
  comment?: string;
  imageUrl = "../../assets/images/";


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getCommentsByPostId();
    this.getPostByPostId();
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
      this.post = post;
      console.log(this.post);
    })
  }

  commentForm() {
    console.log(this.comment);
  }
}

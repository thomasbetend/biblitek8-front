import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Post } from 'src/app/typings';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  data: any;
  id?: number;
  imageUrl = "../../assets/images/";
  like = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getPostByPostId();
  }

  getPostByPostId() {
    if (!this.id) return;
    this.apiService.getPostsByPostId(this.id).subscribe((data)=> {
      console.log(data);
      this.data = data;
    });
  }

  addLike() {

  }

  onDeletePost() {
    if (!this.id) return;
    this.apiService.deletePost(this.id).subscribe((data)=>{
      console.log(data);
    });
    this.router.navigate(['/']);
  }
}

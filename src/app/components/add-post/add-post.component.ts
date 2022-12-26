import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { ApiService } from 'src/app/services/api.service';
import { Post } from 'src/app/typings';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {

  post: PostModel = new PostModel();
  data: any;
  isPostSuccess = false;
  error = false;

  constructor(private apiService : ApiService, private router: Router) { }

  ngOnInit(): void { 
    this.error = false;
    this.isPostSuccess = false;
  }

  addPost() {
    if (!this.post.description || !this.post.image) {
      this.error = true;
      console.log(this.error);
      return;
    }

    this.apiService.addPost(this.post!).subscribe(data => {
      console.log(data);
      this.isPostSuccess = true;
    });

    setTimeout(() => {
      this.router.navigate(['']);
    }, 2000);
  }

}

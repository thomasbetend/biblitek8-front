import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Post } from 'src/app/typings';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  data: any;
  imageUrl?: string;
  posts: Post[] = [
    {
      id: 0,
      image: "livre02.jpeg",
      description: "J'adore ce livre.",
      user: {
          id: 0,
          pseudo: "Bobby",
          avatar: "avatar01.jpeg",
      }
    },
    {
      id: 0,
      image: "livre01.png",
      description: "Yes !!! Trop bien :-)",
      user: {
          id: 0,
          pseudo: "Leslie",
          avatar: "avatar02.jpeg",
      }
    },
  ]

  constructor(private apiService: ApiService) { 
    this.refreshList();
  }

  ngOnInit() {}

  refreshList() {
    this.apiService.getPostsList().subscribe(data => {
      console.log(data);
      this.data = data;
  });
  }

}

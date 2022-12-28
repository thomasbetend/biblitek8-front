import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../typings';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.apiService.getPostsList().subscribe(data => {
      console.log(data);
      this.data = data;
  });
  }


}

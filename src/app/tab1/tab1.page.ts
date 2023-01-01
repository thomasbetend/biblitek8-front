import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
      },
      date: "2022-12-27 19:35:51",
    },
    {
      id: 0,
      image: "livre01.png",
      description: "Yes !!! Trop bien :-)",
      user: {
          id: 0,
          pseudo: "Leslie",
          avatar: "avatar02.jpeg",
      },
      date: "2022-12-27 19:35:51"
    },
  ]

  constructor(private apiService: ApiService, private router: Router) {
    this.refreshList();
  }

  ngOnInit() {
    console.log('refresh page tab1');
    this.refreshList();
  }

  refreshList() {
    this.apiService.getPostsList().subscribe(data => {
      console.log(data);
      this.data = data['hydra:member'];
  });
  }

  showComments(id: number, index: number) {
    console.log(`Showing : ${id}`);
    this.router.navigate(["/post-and-comments", this.data[index].id]);
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Post } from '../typings';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userId?: number;
  token?: string;
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

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private storage: Storage, private apiService: ApiService, private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    //console.log('refresh page tab1');
    this.refreshList();

    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        this.userId = data.id;
      });
    });
  }

  refreshList() {
    this.apiService.getPostsList().subscribe(data => {
      this.data = data['hydra:member'];
  });
  }

  showComments(id: number, index: number) {
    //console.log(`Showing : ${id}`);
    this.router.navigate(["/post-and-comments", this.data[index].id]);
  }

}

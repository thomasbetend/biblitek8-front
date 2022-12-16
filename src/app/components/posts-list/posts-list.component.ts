import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/typings';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {

  posts = [{
    poster: 'https://www.revue-ballast.fr/wp-content/uploads/2017/11/fbsdb.jpg',
    description: 'Le dernier Victor Hugo.',
    user: 'Bobby'
  },
  {
    poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSBoUFHEYefJOcVH6Fa_RwKCKwd6K9vyWB7hy-XXLWsYwdaFqBA',
    description: 'Je l\'ai lu d\'une traite ...',
    user: 'Sally'
  }]

  data: any;
  imageUrl?: string;


  constructor(private apiService: ApiService) { 
    this.refreshList();
    this.imageUrl = "../../assets/images/";
  }

  ngOnInit() {}

  refreshList() {
    this.apiService.getPostsList().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }
}

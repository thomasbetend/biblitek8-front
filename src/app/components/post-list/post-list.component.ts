import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Post } from 'src/app/typings';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

}

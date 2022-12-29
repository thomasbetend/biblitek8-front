import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-post',
  templateUrl: './personal-post.component.html',
  styleUrls: ['./personal-post.component.scss'],
})
export class PersonalPostComponent implements OnInit {

  @Input() post?: any;
  imageUrl = "../../assets/images/";

  constructor() { }

  ngOnInit() {}

}

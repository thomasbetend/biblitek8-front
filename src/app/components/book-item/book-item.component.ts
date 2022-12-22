import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() name?: string;
  @Input() author?: string;
  @Input() bookName?: string;


  constructor() { }

  ngOnInit() {}

}

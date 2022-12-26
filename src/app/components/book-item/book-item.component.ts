import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() name?: string;
  @Input() author?: string;
  @Input() bookName?: string;
  @Output() onDelete = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onDeleteClick() {
    if(!this.bookName) return;
    this.onDelete.emit(this.bookName);
  }

}

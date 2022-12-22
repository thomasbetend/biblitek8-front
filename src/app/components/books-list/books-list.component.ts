import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/typings';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {

  bookChoice?: string;
  bookList: string[] = [];
  name?: string;
  author?: string;
  bookName?: string;

  books: Book[] = [
    {
      author: 'Fiodor Dostoïevski',
      name: 'Les Frères Karamazov'
    },
    {
      author: 'Albert Cohen',
      name: 'Belle du Seigneur'
    },
    {
      author: 'Victor Hugo',
      name: 'Les Misérables'
    },
    {
      author: 'Simone de Beauvoir',
      name: 'Deuxième Sexe'
    },
    {
      author: 'Colette',
      name: 'Sido'
    }
  ]

  constructor() { }

  ngOnInit() {}

  onAddBook() {
    if(!this.bookChoice) return;
    this.bookList.push(this.bookChoice);
    this.bookName = this.bookChoice;
    console.log(this.bookList);
  }

}

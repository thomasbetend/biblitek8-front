import { Component, OnInit } from '@angular/core';
import { Book } from '../typings';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  bookChoice?: string;
  bookList: string[] = [];
  name?: string;
  author?: string;
  bookName?: string;
  isBookListFull?: boolean;
  maxBooks = 3;

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

  constructor() {}

  ngOnInit() {
    this.isBookListFull = false;
  }

  onAddBook() {
    if(!this.bookChoice) return;
    this.bookList.push(this.bookChoice);
    this.bookName = this.bookChoice;
    console.log(this.bookList);
    if(this.bookList.length >= this.maxBooks){
      this.isBookListFull = true;
      return;
    }
  }

  onDeleteBook(bookName: string, index: number) {
    console.log(`Deleting book : ${bookName}`);
    this.bookList.splice(index, 1);
    if(this.bookList.length <= this.maxBooks){
      this.isBookListFull = false;
      return;
    }
  }

}

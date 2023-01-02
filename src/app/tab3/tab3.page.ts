import { Component, OnInit } from '@angular/core';
import { idealBibliModel } from '../models/idealBibli.model';
import { ApiService } from '../services/api.service';
import { Book } from '../typings';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';


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
  maxBooks = 5;
  idealBibli: idealBibliModel = new idealBibliModel();
  idUser?: number;
  errorList = false;
  displayList = false;
  bookAdded: any;

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
      name: 'Le deuxième sexe'
    },
    {
      author: 'Colette',
      name: 'Sido'
    },
    {
      author: 'Truman Capote',
      name: 'De sang froid'
    },
    {
      author: 'Jack Kerouac',
      name: 'Sur la route'
    },
    {
      author: 'Jean Giono',
      name: 'Le chant du monde'
    }
  ]

  constructor(private apiService: ApiService, private storage: Storage, private authService: AuthService ) {}

  ngOnInit() {
    this.isBookListFull = false;

    this.storage.get('token').then((token)=>{

      this.authService.getProfile(token).subscribe((data)=>{
        console.log(data);
        this.idUser = data.id;
      })
    });
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

  validate() {
    this.idealBibli.book1 = this.bookList[0];
    this.idealBibli.book2 = this.bookList[1];
    this.idealBibli.book3 = this.bookList[2];
    this.idealBibli.book4 = this.bookList[3];
    this.idealBibli.book5 = this.bookList[4];
    this.idealBibli.user = `/api/users/${this.idUser}`;

    console.log(this.idealBibli);

    this.apiService.addIdealBibli(this.idealBibli).subscribe({
      next: (bibli)=>{
        console.log('bibli', bibli);
        this.displayList = true;
      }, 
      error:(err)=>{
        console.log(err);
        this.errorList = true;
    } 
    });

    this.apiService.getIdealBibliByUserId(this.idUser).subscribe((data)=>{
      this.bookAdded = data;
    })
  }

}

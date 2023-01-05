import { Component, OnInit } from '@angular/core';
import { idealBibliModel } from '../models/idealBibli.model';
import { ApiService } from '../services/api.service';
import { Book } from '../typings';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';


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
  idealBibliPosted: idealBibliModel = new idealBibliModel();
  idealBibliUser: idealBibliModel = new idealBibliModel();
  idUser?: number;
  errorList = false;
  displayList = false;
  bookAdded: any;
  book1? : string;

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

  constructor(private router: Router, private apiService: ApiService, private storage: Storage, private authService: AuthService ) {}

  ngOnInit() {

    console.log('refresh page tab3');
    this.isBookListFull = false;

    this.storage.get('token').then((token)=>{

      this.authService.getProfile(token).subscribe((data)=>{
        this.idUser = data.id;
      })
    });

    setTimeout(()=>{
      if (!this.idUser) return;
      this.apiService.getIdealBibliByUserId(this.idUser).subscribe((data)=>{
        this.bookAdded = data;
        this.idealBibliUser = this.bookAdded["hydra:member"][0];
        this.idealBibliUser.book1 ? this.displayList = true : this.displayList = false;
      });
    },500);

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
    this.idealBibliPosted.book1 = this.bookList[0];
    this.idealBibliPosted.book2 = this.bookList[1];
    this.idealBibliPosted.book3 = this.bookList[2];
    this.idealBibliPosted.book4 = this.bookList[3];
    this.idealBibliPosted.book5 = this.bookList[4];
    this.idealBibliPosted.user = `/api/users/${this.idUser}`;

    console.log(this.idealBibliPosted);

    this.apiService.addIdealBibli(this.idealBibliPosted).subscribe({
      next: (bibli)=>{
        console.log('bibli', bibli);
      }, 
      error:(err)=>{
        console.log(err);
        this.errorList = true;
    } 
    });
  }

  getIdealBibli() {
    if(!this.idUser) return;
    this.apiService.getIdealBibliByUserId(this.idUser).subscribe((data)=>{
      this.bookAdded = data;
      this.idealBibliUser = this.bookAdded["hydra:member"][0];
    });
  }

  onModifyBibli() {
    this.router.navigate(['/modify-bibliotheque'])
  }

}

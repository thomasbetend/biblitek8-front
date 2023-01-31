import { Component, OnInit } from '@angular/core';
import { idealBibliModel } from '../models/idealBibli.model';
import { ApiService } from '../services/api.service';
import { Book } from '../typings';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, mergeMap } from 'rxjs';


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
  userId?: number;
  errorList = false;
  displayList = false;
  displayForm = true;
  bookAdded: any;
  book1? : string;
  books?: Book[]; 

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService, private storage: Storage, private authService: AuthService ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit() {

    this.isBookListFull = false;
    this.displayForm = false;

    this.apiService.getBookTotalList().subscribe((data)=>{
      this.books = data;
      console.log('this.books', data);
    });

    this.storage.get('token').then((token)=>{

      this.authService.getProfile(token)
        .pipe(
          mergeMap(
            (data: any) => this.apiService.getIdealBibliByUserId(data.id)
          )
        )
        .subscribe({
          next: (data)=>{
          this.bookAdded = data;

          this.idealBibliUser = this.bookAdded["hydra:member"][0];
            this.displayList = true;
            this.displayForm = false;
          },
          error: (err)=>{
            this.displayList = false;
            this.displayForm = true;
            console.log('err', err);
          }
        });
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
    this.idealBibliPosted.book1 = this.bookList[0];
    this.idealBibliPosted.book2 = this.bookList[1];
    this.idealBibliPosted.book3 = this.bookList[2];
    this.idealBibliPosted.book4 = this.bookList[3];
    this.idealBibliPosted.book5 = this.bookList[4];
    this.idealBibliPosted.user = `/api/users/${this.userId}`;

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
    if(!this.userId) return;
    this.apiService.getIdealBibliByUserId(this.userId).subscribe((data)=>{
      this.bookAdded = data;
      this.idealBibliUser = this.bookAdded["hydra:member"][0];
    });
  }

  onModifyBibli() {
    this.router.navigate(['/modify-bibliotheque'])
  }

}

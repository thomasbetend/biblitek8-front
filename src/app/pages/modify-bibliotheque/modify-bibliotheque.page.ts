import { Component, OnInit } from '@angular/core';
import { idealBibliModel } from 'src/app/models/idealBibli.model';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-bibliotheque',
  templateUrl: './modify-bibliotheque.page.html',
  styleUrls: ['./modify-bibliotheque.page.scss'],
})
export class ModifyBibliothequePage implements OnInit {

  idealBibli: idealBibliModel = new idealBibliModel();
  token?: string;
  pseudo?: string;
  avatar?: string;
  userId?: number;
  data?: any;

  constructor(private router: Router, private authService: AuthService, private apiService: ApiService, private storage: Storage) { 
  }

  ngOnInit() {
    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token).subscribe((data)=>{
        this.userId = data.id;
        console.log(this.userId);

        if (!this.userId) return;
        this.apiService.getIdealBibliByUserId(this.userId).subscribe((data)=>{
          this.data = data["hydra:member"];
          console.log(this.data[0]);
          this.idealBibli = this.data[0];
      });
      })
    });
  }

  onModifyBibli() {
    if (!this.idealBibli) return;
    this.apiService.modifyBibli(this.data[0].id, this.idealBibli).subscribe((data)=>{
        console.log(data);
      }
    );
    this.router.navigate(['/modify-bibliotheque']); 
  }

  
}

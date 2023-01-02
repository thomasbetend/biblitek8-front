import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel2 } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  user: UserModel2 = new UserModel2();

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  addNewUser() {
    this.apiService.addUser(this.user).subscribe({
      next: (data)=>{
          console.log(data);
          this.router.navigate(['/']);
        },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}

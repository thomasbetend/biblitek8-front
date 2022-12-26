import { Component, OnInit } from '@angular/core';
import { User } from '../typings';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.page.html',
  styleUrls: ['./conversations-list.page.scss'],
})
export class ConversationsListPage implements OnInit {

  usersMessages: User[] = [
    {
      firstname : 'Linda',
      lastname : 'Martin'
    },
    {
      firstname : 'Michel',
      lastname : 'Simon'
    },
    {
      firstname : 'Suzanne',
      lastname : 'Thab'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}

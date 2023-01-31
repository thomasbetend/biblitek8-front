import { Component, Input, OnInit } from '@angular/core';
import { Conversation, User } from 'src/app/typings';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss'],
})
export class ConversationItemComponent implements OnInit {

  @Input() firstname?: string;
  @Input() lastname?: string;
  @Input() user?: User;
  @Input() pseudo?: string;
  @Input() avatar?: string;
  imageUrl = environment.imageUrl;

  constructor() { }

  ngOnInit() {
    console.log(this.avatar);
  }

}

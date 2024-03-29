import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Conversation, User } from '../../typings';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { mergeMap, of } from 'rxjs';


@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.page.html',
  styleUrls: ['./conversations-list.page.scss'],
})
export class ConversationsListPage implements OnInit {

  conversationUsers?: number[];
  conversations?: Conversation[];
  id?: number;
  token?: string;
  user1: any[] = [];
  user2: any[] = [];

  usersMessages: User[] = [
    {
      id: 1,
      firstname: 'Linda',
      lastname: 'Martin',
      pseudo: 'Lind'
    },
    {
      id: 1,
      firstname: 'Michel',
      lastname: 'Simon',
      pseudo: 'Mich'
    },
    {
      id: 1,
      firstname: 'Suzanne',
      lastname: 'Thab',
      pseudo: 'Suz'
    },
  ]

  constructor(private authService: AuthService, private apiService: ApiService, private storage: Storage) { }

  ngOnInit() {

    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token)
        .pipe(
          mergeMap(
            (data: any) => {
              this.id = data.id;
              return this.apiService.getConversationsByIdUser(data.id);
            }
          )
        )
        .subscribe((data)=>{
          this.conversations = data["hydra:member"];

          this.conversations.forEach(element => {
            this.user1.push([element.user, element.id]);
          });

          this.user1.forEach(element => {
            element[0].forEach((value: any) => {
              if (value.id !== this.id) {
                this.user2.push([value, element[1]])
              }
            });
          });
        }
      );
    });
  }
}

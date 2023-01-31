import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { map, mergeMap, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { User2 } from 'src/app/typings';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  conversationId?: number;
  token?: string;
  pseudo?: string;
  avatar?: string;
  userToId?: number;
  userToAvatar?: string;
  userToPseudo?: string;
  messageContent?: string;
  messages?: any;
  data?: any;
  imageUrl = environment.imageUrl;
  id?: number;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private apiService: ApiService, private storage: Storage) { 
    this.conversationId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {

    this.storage.get('token').then((token)=>{
      this.token = token;

      this.authService.getProfile(token)
        .pipe(
          map((data : any) => {
            this.id = data.id;
            this.pseudo = data.pseudo;
            this.avatar = data.avatar;
          })
        )
        .pipe(
          mergeMap(
            (data: any) => {
              if (!this.conversationId) return of();
              return this.apiService.getMessagesByConversationId(this.conversationId);
            }
          )
        )
        .subscribe(
          (data: any) => {
            this.messages = data["hydra:member"];
  
            this.messages.forEach((element: any) => {
              if(element.user.id !== this.id) {
                this.userToId = element.user.id;
                this.userToAvatar = element.user.avatar;
                this.userToPseudo = element.user.pseudo;
              }
            })
            console.log(this.userToId);
          }
        );
      });
  }

  getConversation() {
    if (!this.conversationId) return;
    return this.apiService.getConversationById(this.conversationId)
      .subscribe(
        (data: any) => {
        }
      );
  }

  sendMessage() {

  }

}

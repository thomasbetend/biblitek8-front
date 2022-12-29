import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostAndCommentsPageRoutingModule } from './post-and-comments-routing.module';

import { PostAndCommentsPage } from './post-and-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostAndCommentsPageRoutingModule
  ],
  declarations: [PostAndCommentsPage]
})
export class PostAndCommentsPageModule {}

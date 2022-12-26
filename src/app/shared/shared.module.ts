import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from '../components/post/post.component';
import { PostListComponent } from '../components/post-list/post-list.component';
import { AddPostComponent } from '../components/add-post/add-post.component';
import { FormsModule } from '@angular/forms';
import { AddPostSuccessComponent } from '../components/add-post-success/add-post-success.component';
import { ConversationItemComponent } from '../components/conversation-item/conversation-item.component';
import { BookItemComponent } from '../components/book-item/book-item.component';
import { BooksListComponent } from '../components/books-list/books-list.component';

@NgModule({
  declarations: [HeaderComponent, PostComponent, PostListComponent, AddPostComponent, AddPostSuccessComponent, ConversationItemComponent, BookItemComponent, BooksListComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    PostComponent,
    PostListComponent,
    AddPostComponent,
    AddPostSuccessComponent,
    BookItemComponent,
    BooksListComponent,
    ConversationItemComponent
  ]
})
export class SharedModule { }

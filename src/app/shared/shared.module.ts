import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from '../components/post/post.component';
import { PostListComponent } from '../components/post-list/post-list.component';
import { AddPostComponent } from '../components/add-post/add-post.component';
import { FormsModule } from '@angular/forms';
import { AddPostSuccessComponent } from '../components/add-post-success/add-post-success.component';

@NgModule({
  declarations: [HeaderComponent, PostComponent, PostListComponent, AddPostComponent, AddPostSuccessComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    PostComponent,
    PostListComponent,
    AddPostComponent,
    AddPostSuccessComponent
  ]
})
export class SharedModule { }

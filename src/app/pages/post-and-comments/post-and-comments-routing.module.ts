import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostAndCommentsPage } from './post-and-comments.page';

const routes: Routes = [
  {
    path: '',
    component: PostAndCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAndCommentsPageRoutingModule {}

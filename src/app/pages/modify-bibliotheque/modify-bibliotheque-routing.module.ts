import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyBibliothequePage } from './modify-bibliotheque.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyBibliothequePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyBibliothequePageRoutingModule {}

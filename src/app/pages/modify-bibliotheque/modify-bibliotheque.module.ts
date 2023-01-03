import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyBibliothequePageRoutingModule } from './modify-bibliotheque-routing.module';

import { ModifyBibliothequePage } from './modify-bibliotheque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyBibliothequePageRoutingModule
  ],
  declarations: [ModifyBibliothequePage]
})
export class ModifyBibliothequePageModule {}

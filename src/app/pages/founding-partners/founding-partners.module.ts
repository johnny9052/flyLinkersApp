import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FoundingPartnersPage } from './founding-partners.page';

const routes: Routes = [
  {
    path: '',
    component: FoundingPartnersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FoundingPartnersPage]
})
export class FoundingPartnersPageModule {}

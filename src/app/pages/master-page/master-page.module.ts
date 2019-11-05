import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MasterPagePage } from './master-page.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DenunciarPostPage } from '../denunciar-post/denunciar-post.page';
import { DenunciarPostPageModule } from '../denunciar-post/denunciar-post.module';

const routes: Routes = [
  {
    path: '',
    component: MasterPagePage
  }
];

@NgModule({
  entryComponents: [
    /*Necesario para que funcione el modal*/
    DenunciarPostPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TranslateModule,
    /*Necesario para que funcione el modal*/
    DenunciarPostPageModule
  ],
  declarations: [MasterPagePage]
})
export class MasterPagePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserPostsPage } from './user-posts.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DenunciarPostPageModule } from '../denunciar-post/denunciar-post.module';

const routes: Routes = [
  {
    path: '',
    component: UserPostsPage
  }
];

@NgModule({
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
  declarations: [UserPostsPage]
})
export class UserPostsPageModule {}

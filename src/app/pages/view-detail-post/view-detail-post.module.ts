import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewDetailPostPage } from './view-detail-post.page';
import { ComponentsModule } from '../../components/components.module';
import { PopcommentsComponent } from '../../components/popcomments/popcomments.component';
import { PoprecommentsComponent } from '../../components/poprecomments/poprecomments.component';

const routes: Routes = [
  {
    path: '',
    component: ViewDetailPostPage
  }
];

@NgModule({
  entryComponents:[
    PopcommentsComponent,
    PoprecommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewDetailPostPage]
})
export class ViewDetailPostPageModule {}

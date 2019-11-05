import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileDetailPage } from './profile-detail.page';

import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DenunciarUsuarioPage } from '../denunciar-usuario/denunciar-usuario.page';
import { DenunciarUsuarioPageModule } from '../denunciar-usuario/denunciar-usuario.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailPage
  }
];

@NgModule({
  entryComponents: [
    /*Necesario para que funcione el modal*/
    DenunciarUsuarioPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TranslateModule,
    /*Necesario para que funcione el modal*/
    DenunciarUsuarioPageModule
  ],
  declarations: [ProfileDetailPage]
})
export class ProfileDetailPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileEditPage } from './profile-edit.page';
import { ComponentsModule } from '../../components/components.module';
import { ProfileEditExperiencePageModule } from '../profile-edit-experience/profile-edit-experience.module';
import { ProfileEditExperiencePage } from '../profile-edit-experience/profile-edit-experience.page';

import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileEditPage
  }
];

@NgModule({
   /*Recordar hacer esta asociacion, apuntanto a la pagina que se quiere cargar como modal*/
   entryComponents: [
    ProfileEditExperiencePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    /*Se importa como modulo, el modulo de la pagina que se quiere cargar (OJOOOO ES EL MODULO)*/
    ProfileEditExperiencePageModule
  ],
  declarations: [ProfileEditPage]
})
export class ProfileEditPageModule {}

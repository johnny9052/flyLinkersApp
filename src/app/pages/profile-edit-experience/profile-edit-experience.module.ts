import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*OJOOOOOOO TODO LO COMENTADO ES PARA QUE ESTA PAGINA CARGUE COMO UN MODAL*/

// import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileEditExperiencePage } from './profile-edit-experience.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

// const routes: Routes = [
//   {
//     path: '',
//     component: ProfileEditExperiencePage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule
    // RouterModule.forChild(routes)
  ],
  declarations: [ProfileEditExperiencePage]
})
export class ProfileEditExperiencePageModule {}

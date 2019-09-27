import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LogInPage } from './log-in.page';
import { ComponentsModule } from '../../components/components.module';

/*Necesario para las opciones de la parte superior del idioma tipo popover*/
import { LanguageComponent } from '../../components/language/language.component';

import { TranslateModule } from '@ngx-translate/core';



const routes: Routes = [
  {
    path: '',
    component: LogInPage
  }
];

@NgModule({
  entryComponents: [
    LanguageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TranslateModule
  ],
  declarations: [LogInPage]
})
export class LogInPageModule {}

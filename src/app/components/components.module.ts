import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*Import de los diferentes componentes creados*/
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TabComponent } from './tab/tab.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { FooterLoginComponent } from './footer-login/footer-login.component';
import { FooterComponent } from './footer/footer.component';
/*END Import de los diferentes componentes creados*/

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PopcommentsComponent } from './popcomments/popcomments.component';
import { PoprecommentsComponent } from './poprecomments/poprecomments.component';
import { LanguageComponent } from './language/language.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
   HeaderComponent,
   MenuComponent,
   TabComponent,
   HeaderLoginComponent,
   FooterLoginComponent,
   FooterComponent,
   PopcommentsComponent,
   PoprecommentsComponent,
   LanguageComponent
  ],
  exports: [
   /*Todos los componentes se que exportaran a traves del modulo*/
   HeaderComponent,
   MenuComponent,
   TabComponent,
   HeaderLoginComponent,
   FooterLoginComponent,
   FooterComponent,
   PopcommentsComponent,
   PoprecommentsComponent,
   LanguageComponent
   /*END Todos los componentes se que exportaran a traves del modulo*/
],
  imports: [
    CommonModule,
    /*Import necesario para que reconozca las etiquetas del IONIC*/
    IonicModule,
    /*Import necesario para redireccionar*/
    RouterModule,
    TranslateModule
  ]
})
export class ComponentsModule { }

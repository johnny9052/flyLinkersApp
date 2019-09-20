import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TabComponent } from './tab/tab.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { FooterLoginComponent } from './footer-login/footer-login.component';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PopcommentsComponent } from './popcomments/popcomments.component';
import { PoprecommentsComponent } from './poprecomments/poprecomments.component';

@NgModule({
  declarations: [
   HeaderComponent,
   MenuComponent,
   TabComponent,
   HeaderLoginComponent,
   FooterLoginComponent,
   FooterComponent,
   PopcommentsComponent,
   PoprecommentsComponent
  ],
  exports: [
   HeaderComponent,
   MenuComponent,
   TabComponent,
   HeaderLoginComponent,
   FooterLoginComponent,
   FooterComponent,
   PopcommentsComponent,
   PoprecommentsComponent
],
  imports: [
    CommonModule,
    /*Import necesario para que reconozca las etiquetas del IONIC*/
    IonicModule,
    /*Import necesario para redireccionar*/
    RouterModule
  ]
})
export class ComponentsModule { }

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

/*Elementos necesarios para el popover del idioma*/
import { PopoverController } from '@ionic/angular';
import { LanguageComponent } from '../../components/language/language.component';
import { HelperService } from '../../util/HelperService';



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss']
})

/*Se implementa AfterViewInit para poder hacer uso correcto de ngAfterViewInit */
export class LogInPage implements OnInit, AfterViewInit {
  /*Se selecciona el slide*/
  @ViewChild('slides', { static: false }) slides: IonSlides;


  constructor(
    private popoverCtl: PopoverController,
    private helperService: HelperService
  ) {

  }

  ngOnInit() {
    this.helperService.cargarIdiomaActual();
  }

  /*En el llamado se llama a la funcion que se encargara de gestionar el bloqueo del slide*/
  ngAfterViewInit() {
    this.lockSwipes(true);
  }


  /*funcion que bloquea el slide*/
  lockSwipes(bool: boolean) {
    this.slides.lockSwipes(bool);
  }


  async mostrarListaIdiomas(ev) {
    const popover = await this.popoverCtl.create({
      component: LanguageComponent,
      event: ev,
      translucent: true,
      mode: 'ios',
      backdropDismiss: false
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();

    this.helperService.cambiarLenguaje(data.item);
  }
}

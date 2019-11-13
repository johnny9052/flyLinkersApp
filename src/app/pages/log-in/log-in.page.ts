import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides, Events } from '@ionic/angular';

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
    private helperService: HelperService,
    public events: Events
  ) {}

  ngOnInit() {
    this.helperService.cargarIdiomaActual();
    this.isUserExist();
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

  isUserExist() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      // console.log('la respuesta obtenida es ' + response);
      if (this.helperService.isValidValue(response)) {
        // console.log('entre');
        /*Se activa el evento user:logIn, el cual se registro en el menu, para que tan pronto se identique
          un usuario, se actualice la informacion en pantalla*/
        this.events.publish('user:logIn');

        this.helperService.getLocalData('profileUser').then(response2 => {
          // console.log('la respuesta obtenida2 es ' + response2);
          if (this.helperService.isValidValue(response2)) {
            if (response2 !== '-1') {
              // console.log('vamos a redireccionar al master');
              this.helperService.redireccionar('/master-page');
            } else {
              this.helperService.redireccionar('/profile-edit');
            }
          }
        });
      }
    });
  }
}

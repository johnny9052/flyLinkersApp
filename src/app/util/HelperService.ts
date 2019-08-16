import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HelperService {


  constructor(public alertCtrl: AlertController) { }



  async presentAlert(titulo: string, descripcion: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      /* subHeader: 'Subtitle',*/
      message: descripcion,
      buttons: [
        /*{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          }
        },*/
        {
          text: 'Aceptar',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton OK');
          }
        }
      ]
    });

    await alert.present();
  }

}

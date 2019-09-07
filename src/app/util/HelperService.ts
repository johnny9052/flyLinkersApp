import { Injectable } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  /*Barra de carga mostrada al usuario*/
  loading: any;
  /*Variable bandera que indicara si hay una peticion pendiente
  de una apertura de una barra de carga*/
  isLoadingLoadModal = false;

  /*Dependencias del servicio
  alertCtrl: Depedencia para los modales
  loadingCtrl: Dependencia para las barras de carga*/
  constructor(public alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController) { }


 /*Funcion que muestra un modal, con su titulo y descripcion*/
  async showAlert(titulo: string, descripcion: string) {

    const alert = await this.alertCtrl.create({
      header: titulo,
      message: descripcion,
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'flylinkersColor',
          handler: (blah) => {
            console.log('Boton OK');
          }
        }
      ]
    });

    await alert.present();
  }



    /*Funcion que se encarga de mostrar un modal de registro exitoso y
  redireccionar al login*/
  async showAlertRedirect(titulo: string, mensaje: string, redirectURL: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'flylinkersColor',
          handler: (blah) => {
            /*Cuando se da tap en aceptar redirecciona al login*/
            this.navCtrl.navigateBack(redirectURL);
          }
        }
      ]
    });

    await alert.present();
  }







  /*Funcion que muestra una barra de carga con un mensaje*/
  async mostrarBarraDeCarga(mensaje: string) {
    /*Antes de crear un nuevo mensaje de carga se verifica que no haya una peticion
    pendiente*/
    if (this.loading != null) {
      this.loading.dismiss();
    }

    /*Se establece la variable global bandera que indica que se establecera una nueva
    peticion de apertura de la barra de carga*/
    this.isLoadingLoadModal = true;
    /*Se inicia el proceso asincrono de la apertura de la barra de carga*/
    this.loading = await this.loadingCtrl.create({
        message: mensaje
    });
    /*Si la peticion aun sigue activa (y no ha habido un proceso de cierre mientras que
      se creaba que cambie la variable) entonces se muestra la barra de carga, de lo
      contrario se omite mostrar la barra de carga creada la cual tado un tiempo*/
    if (this.isLoadingLoadModal) {
        this.isLoadingLoadModal = false;
        return this.loading.present();
    }
  }

  /*Funcion que oculta la barra de carga que se encuentre mostrando en el momento*/
  ocultarBarraCarga() {
    /*Se cambia la bandera indicando que no se puede mostrar la barra si dado el caso
    esta se esta creando*/
    this.isLoadingLoadModal = false;
    /*Si exite una barra de carga que ya se encuentre mostrandoce, entonces se cierra*/
    if (this.loading != null) {
      this.loading.dismiss();
    }
  }

}
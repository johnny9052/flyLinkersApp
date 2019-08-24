import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { HelperService } from '../util/HelperService';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  /*El post recibe una URL privada, por esto se define globalmente*/
  private urlRegister = 'http://127.0.0.1:8000/es/registerApp/';


  /*Dependencias del servicio
  http: Dependencia para las peticiones al servidor
  navCtrl: Dependencia para redireccionar a otras paginas
  alertCtrl: Depedencia para los modales,
  HelperService: Clase utilitaria*/
  constructor(private http: HttpClient,
              private navCtrl: NavController,
              public alertCtrl: AlertController,
              public helperService: HelperService) { }

  /*Funcion que se encarga de registrar al usuario, recibiendo por parametro 
  los datos del usuario*/
  registerUser( postData: any) {
  /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga('Espere por favor');
    /*Se envian los datos al servidor, enviando la url y los datos*/
    this.http.post(this.urlRegister, postData).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.modalRegistroExitoso();
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.presentAlert('Error', 'El usuario ya se encuentra registrado');
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.presentAlert('Error', 'Error procesando la transaccion');
    });
  }


  /*Funcion que se encarga de mostrar un modal de registro exitoso y
  redireccionar al login*/
  async modalRegistroExitoso() {
    const alert = await this.alertCtrl.create({
      header: 'Exito',
      message: 'Usuario registrado correctamente',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'flylinkersColor',
          handler: (blah) => {
            /*Cuando se da tap en aceptar redirecciona al login*/
            this.navCtrl.navigateBack('/identify');
          }
        }
      ]
    });

    await alert.present();
  }
}

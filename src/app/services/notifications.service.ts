import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelNotifications } from '../interfaces/notifications';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {


      /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

  constructor(private http: HttpClient,
              public helperService: HelperService,
              private navCtrl: NavController) { }

  getNotifications(pkUser: string) {
    return this.http.get<ModelNotifications>('https://flylinkers.com/es/notifications/get_notifications_app/?profile_pk=' + pkUser);
  }


  async viewNotification( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/notifications/notification_redirect_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga('Espere por favor');
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(urlRegister, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1' && res.idPost === '-2')  {
        this.helperService.showAlertRedirect('Exito', res.mensaje, '/network');
      } else if (res.code === '1' && res.idPost === '-1') {
          this.helperService.showAlert('Error', res.mensaje);
      } else if (res.code === '1' && res.idPost !== '-1' && res.idPost !== '-2') {
        this.helperService.showAlert('Exito', res.mensaje);
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert('Error', res.mensaje);
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert('Error', 'Error procesando la transaccion');
    });
  }

}

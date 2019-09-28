import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelNetworkData } from '../interfaces/network';
import { HelperService } from '../util/HelperService';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

    /*Definicion del header funcional para envios via post*/
    private headersPost = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

  constructor(private http: HttpClient,
              public helperService: HelperService,
              private translate: TranslateService) { }


  getContacts(pkUser: string) {
     return this.http.get<ModelNetworkData>('https://flylinkers.com/es/network/network_list_app/?profile_pk=' + pkUser);
  }



  /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
  los datos del usuario*/
  async aceptarSolicitudAmistad( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/network/connection_actions_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(urlRegister, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('exitoTransaccion'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }

  async enviarSolicitudAmistad( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/network/connection_actions_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(urlRegister, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('solicitudAmistadEnviadaExito'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }

  async eliminarAmistad( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/network/connection_actions_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(urlRegister, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('conexionEliminada'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }

  async cancelarSolicitudAmistad( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/network/connection_actions_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(urlRegister, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('solicitudEliminada'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { HelperService } from '../util/HelperService';




@Injectable({
  providedIn: 'root'
})
export class SecurityService {


  /*Dependencias del servicio
  http: Dependencia para las peticiones al servidor
  alertCtrl: Depedencia para los modales,
  HelperService: Clase utilitaria
  */
  constructor(private http: HttpClient,
              public alertCtrl: AlertController,
              public helperService: HelperService
              ) { }

  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });


  /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
  los datos del usuario*/
  registerUser( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/registerApp/';
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
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlertRedirect('Exito', 'Usuario registrado exitosamente', '/identify');
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert('Error', 'El usuario ya se encuentra registrado');
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert('Error', 'Error procesando la transaccion');
    });
  }



  /*Funcion que se encarga de identificar al usuario, recibiendo por parametro
  sus datos de acceso*/
  logInUser( postData: any) {
      const urlLogIn = 'https://flylinkers.com/es/login_user_app/';
      /*Se muestra una barra de carga*/
      this.helperService.mostrarBarraDeCarga('Espere por favor');
      /*Se envian los datos al servidor, enviando la url y los datos*/
      this.http.post(urlLogIn, postData, {headers: this.headersPost}).subscribe(data => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Se define una variable local para recibir la respuesta*/
        let res: any;
        res = data;
        /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
        if (res.code === '1') {

          /*Se almacena de manera local el identificador del usuario*/
          this.helperService.saveLocalData('profilePk', res.userPk);

          if (res.perfil !== '-1') {
            /*Se valida si el usuario ya actualizo los datos del perfil o no para saber si se manda al home o
            a actualizar los datos de perfil*/
            this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/master-page');
          } else {
            this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/profile-edit');
          }
        } else {
          /*Si no retorna uno es porque el usuario ya existe*/
          this.helperService.showAlert('Error', 'El usuario no existe');
        }
      }, error => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Sino es porque se genero un error en el servidor*/
        this.helperService.showAlert('Error', 'Error procesando la transaccion');
        // this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/profile-edit');
      });
  }





  // logInUserCordova( postData: any) {
  //   this.helperService.mostrarBarraDeCarga('Espere por favor');
  //   this.httpCordova.post(this.urlLogIn, postData, {})
  //     .then(data => {
  //      let res: any;
  //      res = data;
  //      if (res.code === '1') {
  //        if (res.perfil !== '-1') {
  //          this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/master-page');
  //        } else {
  //          this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/profile');
  //        }
  //      } else {
  //        this.helperService.showAlert('Error', 'El usuario no existe');
  //      }
  //     })
  //     .catch(error => {
  //      this.helperService.ocultarBarraCarga();
  //      this.helperService.showAlert('Error', 'Error procesando la transaccion');
  //     });
  //   }


  // registerUserCordova( postData: any) {
  //     this.helperService.mostrarBarraDeCarga('Espere por favor');
  //     this.httpCordova.post(this.urlLogIn, postData, {})
  //     .then(data => {
  //       this.helperService.ocultarBarraCarga();
  //       let res: any;
  //       res = data;
  //       if (res.code === '1') {
  //         this.helperService.showAlertRedirect('Exito', 'Usuario registrado exitosamente', '/identify');
  //       } else {
  //         this.helperService.showAlert('Error', 'El usuario ya se encuentra registrado');
  //       }
  //     }, error => {
  //       this.helperService.ocultarBarraCarga();
  //       this.helperService.showAlert('Error', 'Error procesando la transaccion');
  //     });
  //   }



  }


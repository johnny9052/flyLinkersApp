import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { HelperService } from '../util/HelperService';
import { ModelUserLogIn } from '../interfaces/userInterface';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  /*El post recibe una URL privada, por esto se define globalmente*/
  private urlRegister = 'http://flylinkers.com/es/registerApp/';

  private urlLogIn = 'http://flylinkers.com/es/login_user_app/';





  /*Dependencias del servicio
  http: Dependencia para las peticiones al servidor
  navCtrl: Dependencia para redireccionar a otras paginas
  alertCtrl: Depedencia para los modales,
  HelperService: Clase utilitaria*/
  constructor(private http: HttpClient,
              public alertCtrl: AlertController,
              public helperService: HelperService,
              private httpCordova: HTTP) { }

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



      /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
  los datos del usuario*/
  logInUser( postData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga('Espere por favor');
      /*Se envian los datos al servidor, enviando la url y los datos*/
    this.http.post(this.urlLogIn, postData, {headers}).subscribe(data => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Se define una variable local para recibir la respuesta*/
        let res: any;
        res = data;
        /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
        if (res.code === '1') {
          if (res.perfil !== '-1') {
            /*Se valida si el usuario ya actualizo los datos del perfil o no para saber si se manda al home o
            a actualizar los datos de perfil*/
            this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/master-page');
          } else {
            this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/profile');
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
        // this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/profile');
      });
  }




    /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
  los datos del usuario*/
  logInUserCordova( postData: any) {

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga('Espere por favor');

    this.httpCordova.post(this.urlLogIn, postData, {})
      .then(data => {

       /*Se define una variable local para recibir la respuesta*/
       let res: any;
       res = data;
       /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
       if (res.code === '1') {
         if (res.perfil !== '-1') {
           /*Se valida si el usuario ya actualizo los datos del perfil o no para saber si se manda al home o
           a actualizar los datos de perfil*/
           this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/master-page');
         } else {
           this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/profile');
         }
       } else {
         /*Si no retorna uno es porque el usuario ya existe*/
         this.helperService.showAlert('Error', 'El usuario no existe');
       }

      })
      .catch(error => {

       /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
       this.helperService.ocultarBarraCarga();
       /*Sino es porque se genero un error en el servidor*/
       this.helperService.showAlert('Error', 'Error procesando la transaccion');
       // this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/profile');

      });



    }



  }


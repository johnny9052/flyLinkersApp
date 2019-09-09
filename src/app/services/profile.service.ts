import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { HelperService } from '../util/HelperService';

import { Storage } from '@ionic/storage';
import { Profile } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


    /*Definicion del header funcional para envios via post*/
    private headersPost = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

  /*Dependencias del servicio
  http: Dependencia para las peticiones al servidor
  navCtrl: Dependencia para redireccionar a otras paginas
  alertCtrl: Depedencia para los modales,
  HelperService: Clase utilitaria
  Storage: Almacenamiento local*/
  constructor(private http: HttpClient,
              public alertCtrl: AlertController,
              public helperService: HelperService,
              private storage: Storage) { }




  getProfileData(pkUser: string) {
       return this.http.get<Profile>('https://flylinkers.com/es/network/get_profile_app/' + pkUser);
  }


  getListSkillUser(pkUser: string) {
    console.log('vamos a traer algo');
    return this.http.get<Profile>('https://flylinkers.com/es/network/get_skills_user_app?pk=' + pkUser);
}



  /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
  los datos del usuario*/
  saveProfileDataService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/edit_profile_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga('Espere por favor');
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlert('Exito', 'Perfil actualizado exitosamente');
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert('Error', 'Error al actualizar el perfil');
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
  saveSkillService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/create_skill_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga('Espere por favor');

    // console.log(postData);

    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlert('Exito', 'Skill registrado exitosamente');
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert('Error', 'Error al registrar el skill');
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
  deleteSkillService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/delete_skill_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga('Espere por favor');

    // console.log(postData);

    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlert('Exito', 'Skill eliminado exitosamente');
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert('Error', 'Error al eliminar el skill');
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
  editSkillService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/edit_skill_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga('Espere por favor');

    // console.log(postData);

    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData, {headers: this.headersPost}).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlert('Exito', 'Skill registrado exitosamente');
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert('Error', 'Error al registrar el skill');
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert('Error', 'Error procesando la transaccion');
    });
  }




}

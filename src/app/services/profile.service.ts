import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { HelperService } from '../util/HelperService';

import { Storage } from '@ionic/storage';
import { Profile } from '../interfaces/userInterface';
import { TranslateService } from '@ngx-translate/core';

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
              private storage: Storage,
              private translate: TranslateService) { }




  /******************************************************/
  /*********FUNCIONES DE GESTION DEL PERFIL**************/
  /******************************************************/

  /*Obtiene la informacion basica del perfil del usuario a traves de su PK*/
  getProfileData(pkUser: string) {
       return this.http.get<Profile>('https://flylinkers.com/es/network/get_profile_app/' + pkUser);
  }

  changePassword(postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/change_password_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('perfilActualizado'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorActualizarPerfil'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }

  deactivateAccount(postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/deactivate_account_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
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
        // tslint:disable-next-line: max-line-length
        this.helperService.showAlertRedirect(this.translate.instant('exitoTitulo'), this.translate.instant('cuentaDesactivada'), '/identify');
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorDesactivandoCuenta'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
  los datos del usuario*/
  saveProfileDataService( postData: any) {
    // console.log(postData);
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/edit_profile_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('perfilActualizado'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorActualizarPerfil'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }




  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS SKILLS***********/
  /******************************************************/


  /*Obtiene todas las skills del usuario a traves de su PK*/
  getListSkillUser(pkUser: string) {
    // console.log('vamos a traer algo');
    return this.http.get<Profile>('https://flylinkers.com/es/network/get_skills_user_app?pk=' + pkUser);
}


  /*Funcion que se encarga de registrar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async saveSkillService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/create_skill_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('skillRegistrada'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorRegistrarSkill'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /*Funcion que se encarga de eliminar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async deleteSkillService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/delete_skill_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('skillEliminada'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorEliminarSkill'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /*Funcion que se encarga de editar un nuevo skill, recibiendo por parametro
  el id del skill y el nuevo contenido del skill*/
  async editSkillService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/edit_skill_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('skillEditada'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorEditarSkill'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS SKILLS**********/
  /******************************************************/





  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS EXPERIENCE***********/
  /******************************************************/


  /*Obtiene todas las skills del usuario a traves de su PK*/
  getListExperienceUser(pkUser: string) {
      return this.http.get<Profile>('https://flylinkers.com/es/network/get_experiences_user_app?pk=' + pkUser);
  }


  /*Funcion que se encarga de registrar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async saveExperienceService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/create_experience_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('experienciaRegistrada'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorRegistrarExperiencia'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /*Funcion que se encarga de eliminar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async deleteExperienceService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/delete_experience_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('experienciaEliminada'));
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


  /*Funcion que se encarga de editar un nuevo skill, recibiendo por parametro
  el id del skill y el nuevo contenido del skill*/
  async editExperienceService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/edit_experience_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('experienciaEditada'));
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


  /******************************************************/
  /******END FUNCIONES DE GESTION DE EXPERIENCE**********/
  /******************************************************/








  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS ACCOMPLISHMENTS**/
  /******************************************************/


  /*Obtiene todas las skills del usuario a traves de su PK*/
  getListAccomplishmentUser(pkUser: string) {
    // console.log('vamos a traer algo');
    return this.http.get<Profile>('https://flylinkers.com/es/network/get_accomplishments_user_app?pk=' + pkUser);
  }


  /*Funcion que se encarga de registrar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async saveAccomplishmentService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/create_accomplishment_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('logroRegistrado'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorRegistrarLogro'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /*Funcion que se encarga de eliminar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async deleteAccomplishmentService( postData: any) {
    // console.log(postData.pk);
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/delete_accomplishment_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('logroEliminado'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorEliminarLogro'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /*Funcion que se encarga de editar un nuevo skill, recibiendo por parametro
  el id del skill y el nuevo contenido del skill*/
  async editAccomplishmentService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/edit_accomplishment_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('logroEditado'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorEditarLogro'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS ACCOMPLISHMENTS*/
  /******************************************************/







  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS INTEREST*********/
  /******************************************************/


  /*Obtiene todas las skills del usuario a traves de su PK*/
  getListInterestsUser(pkUser: string) {
    // console.log('vamos a traer algo');
    return this.http.get<Profile>('https://flylinkers.com/es/network/get_interests_user_app?pk=' + pkUser);
  }


  /*Funcion que se encarga de registrar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async saveInterestsService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/create_interest_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('interesRegistrado'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorRegistrarInteres'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /*Funcion que se encarga de eliminar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async deleteInterestsService( postData: any) {
    // console.log(postData.pk);
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/delete_interest_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('interesEliminado'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorEliminarInteres'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /*Funcion que se encarga de editar un nuevo skill, recibiendo por parametro
  el id del skill y el nuevo contenido del skill*/
  async editInterestsService( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/network/edit_interest_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    // // console.log(postData);

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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('interesEditado'));
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorEditarInteres'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }


  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS INTEREST********/
  /******************************************************/





}

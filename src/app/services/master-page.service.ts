import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelPosts } from '../interfaces/posts';
import { HelperService } from '../util/HelperService';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {

   /*Definicion del header funcional para envios via post*/
   private headersPost = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });


  constructor(private http: HttpClient,
              public helperService: HelperService,
              private translate: TranslateService) { }

  getPosts(pkUser: string) {
    return this.http.get<ModelPosts>('https://flylinkers.com/es/content_network/get_news_app/?userPk=' + pkUser);
  }


  getMetadataPosts(urlMetadata: string) {
    return this.http.get<ModelPosts>('https://flylinkers.com/es/content_network/get_meta_data_app/?url=' + urlMetadata);
  }



  /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
  los datos del usuario*/
  denunciatePost( postData: any) {
    // console.log(postData);
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/xxxxxx/xxxxxxxx/';
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
        this.helperService.showAlert(this.translate.instant('exitoTitulo'), this.translate.instant('denunciaEnviada'));
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

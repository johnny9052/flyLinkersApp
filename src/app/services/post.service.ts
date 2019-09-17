import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HelperService } from '../util/HelperService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelPosts } from '../interfaces/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    /*Definicion del header funcional para envios via post*/
    private headersPost = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });


  constructor(private http: HttpClient,
              public alertCtrl: AlertController,
              public helperService: HelperService) {  }



  publicNewPost( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/content_network/post_new_app/';
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
      if (res.code === '1' || res.code === 1) {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlertRedirect('Exito', 'Post publicado exitosamente', '/master-page');
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert('Error', 'No se puede publicar el post');
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert('Error', 'Error procesando la transaccion');
    });
  }

  getPost(pkUser: string, articleId: string) {
    return this.http.get<ModelPosts>('https://flylinkers.com/es/content_network/get_new_app/?userPk=' +
                                      pkUser + '&article_id=' + articleId);
  }

}

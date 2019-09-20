import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HelperService } from '../util/HelperService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelPosts, ModelComments, ModelRecomments } from '../interfaces/posts';

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

  getComments(postId: string, userPk: string) {
    return this.http.get<ModelComments>('https://flylinkers.com/es/content_network/get_article_comments_app/?postId=' +
                                      postId + '&userPk=' + userPk);
  }

  getRecomments(commentId: string, postId: string, userPk: string) {
    return this.http.get<ModelRecomments>('https://flylinkers.com/es/content_network/get_recomments_app/?comment_id=' + commentId +
                                    '&post_id=' + postId + '&userPk=' + userPk);
  }

  async generarLikePost( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/content_network/post_like_app/';
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

  async saveComment( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/content_network/post_comment_app/';
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
      if (res.code === 1) {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
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

  async saveRecomment( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/content_network/reply_comment_app/';
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
      if (res.code === 1) {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
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


  async deleteComment( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/content_network/delete_comment_app/';
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
      if (res.code === 1) {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
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

  async deleteRecomment( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/content_network/delete_recomment_app/';
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
      if (res.code === 1) {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
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

  async deletePost( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/content_network/delete_post_app/';
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
      if (res.code === 1) {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
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

  async editComment( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/content_network/update_comment_app/';
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
      if (res.code === 1) {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
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

  async editRecomment( postData: any) {
    /*URL del web service*/
    const url = 'https://flylinkers.com/es/content_network/update_recomment_app/';
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
      if (res.code === 1) {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
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

  async generarLikeComment( postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/content_network/comment_like_app/';
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

  getMetadataPosts(urlMetadata: string) {
    return this.http.get<ModelPosts>('https://flylinkers.com/es/content_network/get_meta_data_app/?url=' + urlMetadata);
  }

}

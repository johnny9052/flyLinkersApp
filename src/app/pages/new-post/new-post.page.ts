import { Component, OnInit } from '@angular/core';
import { ModelPosts } from '../../interfaces/posts';
import { PostService } from '../../services/post.service';
import { HelperService } from '../../util/HelperService';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


/*Variable global declarada para que no se marque error al momento de utilizar
el resultado de la camara como un file y no como base64*/
declare var window: any;

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss']
})
export class NewPostPage implements OnInit {

  newPost = {} as ModelPosts;

  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = '';

  constructor(public helperService: HelperService,
              private postService: PostService,
              private camera: Camera) {}

  ngOnInit() {
     // Se obtiene el identidicador del usuario que ingreso al sistema
     this.getProfilePk();
  }


    /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
    getProfilePk() {
      // Se obtiene el identificador del usuario que ingreso al sistema
      this.helperService.getLocalData('profilePk').then(response => {
        this.codeUser = response;
        console.log(this.codeUser);
      });
    }

  publicPost() {
    const now = new Date();
    const today = now.toISOString().substring(0, 10);
    this.newPost.publication_date = today;
    this.newPost.userPk = this.codeUser;

    console.log(this.newPost.id_new + 'Este es el valor');

    const obj = {
        userPk: this.newPost.userPk,
        title: this.newPost.title,
        content: this.newPost.content,
        external_url_new: this.newPost.external_url_new,
        publication_date : this.newPost.publication_date,
        image_new: ((this.newPost.image_new === 'undefined' || this.newPost.image_new === undefined ) ? -1 : this.newPost.image_new),
        article_id: ((this.newPost.id_new === 'undefined' || this.newPost.id_new === undefined ) ? -1 : this.newPost.id_new)
     };

    this.postService.publicNewPost(obj);
  }


  takePicture() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen(options);

  }


  loadPicture() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);
  }


  procesarImagen(options: CameraOptions){
    this.camera.getPicture(options).then((imageData) => {

      const img = window.Ionic.WebView.convertFileSrc( imageData );
      console.log(img);
      this.newPost.image_new = img;

    }, (err) => {
     // Handle error
    });
  }






}

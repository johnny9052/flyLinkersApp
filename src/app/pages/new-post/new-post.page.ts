import { Component, OnInit } from '@angular/core';
import { ModelPosts } from '../../interfaces/posts';
import { PostService } from '../../services/post.service';
import { HelperService } from '../../util/HelperService';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Base64 } from '@ionic-native/base64/ngx';

import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from '../../util/blockAccess';

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
  imagePerfil = '';
  idPost = '';
  changeEditImage = false;

  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    private postService: PostService,
    private camera: Camera,
    private base64: Base64,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        // console.log('******************************');
        this.idPost = this.router.getCurrentNavigation().extras.state.idPost;
        // console.log('IdPost: ' + this.idPost);
        this.newPost.title = this.router.getCurrentNavigation().extras.state.title;
        this.newPost.content = this.router.getCurrentNavigation().extras.state.content;
        this.newPost.external_url_new = this.router.getCurrentNavigation().extras.state.externalUrlNew;
        this.newPost.image_new = this.router.getCurrentNavigation().extras.state.imageNew;

        // tslint:disable-next-line: max-line-length
        if (
          this.newPost.image_new !== undefined &&
          this.newPost.image_new !== 'undefined' &&
          this.newPost.image_new !== null &&
          this.newPost.image_new !== 'null' &&
          this.newPost.image_new !== ''
        ) {
          this.newPost.image_new =
            'https://flylinkers.com/media/' + this.newPost.image_new;
        }
      }

      // Se obtiene el identidicador del usuario que ingreso al sistema
      this.getProfilePk();
      this.getProfileImage();
    });
  }

  ngOnInit() {}

  ionViewWillLeave() {
    this.newPost = {} as ModelPosts;
    /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
    this.codeUser = '';
    this.imagePerfil = '';
    this.idPost = '';
  }

  /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      // console.log(this.codeUser);

      // tslint:disable-next-line: max-line-length
      if (
        this.idPost !== undefined &&
        this.idPost !== 'undefined' &&
        this.idPost !== null &&
        this.idPost !== 'null' &&
        this.idPost !== ''
      ) {
        this.getPost(this.codeUser, this.idPost);
      }
    });
  }

  getPost(pkUser, articleId) {
    // console.log('*********VAMOS POR EL POST***********');

    this.postService.getPost(pkUser, articleId).subscribe(data => {
      let res: any;
      res = data;
      this.newPost = res.post;
      this.newPost.liked_by_user = res.post.liked_by_user[0];

      // tslint:disable-next-line: max-line-length
      if (
        this.newPost.image_new !== undefined &&
        this.newPost.image_new !== 'undefined' &&
        this.newPost.image_new !== null &&
        this.newPost.image_new !== 'null' &&
        this.newPost.image_new !== ''
      ) {
        this.newPost.image_new =
          'https://flylinkers.com/media/' + this.newPost.image_new;
      }
    });
  }

  getProfileImage() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('image_perfil').then(response => {
      // console.log(response);
      this.imagePerfil = response;
    });
  }

  publicPost() {
    const now = new Date();
    const today = now.toISOString().substring(0, 10);
    this.newPost.publication_date = today;
    this.newPost.userPk = this.codeUser;

    // c// console.log(this.newPost.id_new + 'Este es el valor');

    if (this.helperService.isValidValue(this.newPost.image_new)) {
      if (this.newPost.image_new.includes('flylinkers.com')) {
        this.newPost.image_new = this.newPost.image_new.split('media/')[1];
      }
    }

    const obj = {
      userPk: this.newPost.userPk,
      title: this.newPost.title,
      content: this.newPost.content,
      publication_date: this.newPost.publication_date,
      image_new:
        this.newPost.image_new === 'undefined' ||
        this.newPost.image_new === undefined
          ? -1
          : this.newPost.image_new,
      article_id:
        this.newPost.id_new === 'undefined' || this.newPost.id_new === undefined
          ? -1
          : this.newPost.id_new,
      // tslint:disable-next-line: max-line-length
      external_url_new:
        this.newPost.external_url_new === 'undefined' ||
        this.newPost.external_url_new === undefined
          ? -1
          : this.newPost.external_url_new,
      // tslint:disable-next-line: max-line-length
      image_base64:
        this.newPost.image_base64 === 'undefined' ||
        this.newPost.image_base64 === undefined
          ? -1
          : this.newPost.image_base64
    };

    // console.log('Este es el objeto basico');
    // console.log(obj);

    this.postService.publicNewPost(obj);
  }

  editPost() {
    const now = new Date();
    const today = now.toISOString().substring(0, 10);
    this.newPost.publication_date = today;
    this.newPost.userPk = this.codeUser;

    // c// console.log(this.newPost.id_new + 'Este es el valor');

    const obj = {
      pk_post: this.idPost,
      userPk: this.newPost.userPk,
      title: this.newPost.title,
      content: this.newPost.content,
      publication_date: this.newPost.publication_date,
      image_new:
        this.newPost.image_new === 'undefined' ||
        this.newPost.image_new === undefined
          ? -1
          : this.newPost.image_new,
      article_id:
        this.newPost.id_new === 'undefined' || this.newPost.id_new === undefined
          ? -1
          : this.newPost.id_new,
      // tslint:disable-next-line: max-line-length
      external_url_new:
        this.newPost.external_url_new === 'undefined' ||
        this.newPost.external_url_new === undefined
          ? -1
          : this.newPost.external_url_new,
      // tslint:disable-next-line: max-line-length
      image_base64:
        this.newPost.image_base64 === 'undefined' ||
        this.newPost.image_base64 === undefined
          ? -1
          : this.newPost.image_base64
    };

    if (!this.changeEditImage) {
      this.newPost.image_base64 = '-1';
    }

    // console.log('Este es el objeto basico');
    // console.log(obj);

    this.postService.editPost(obj);
  }

  takePictureBase64() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagenBase64(options);
  }

  procesarImagenBase64(options: CameraOptions) {
    this.changeEditImage = true;

    this.camera.getPicture(options).then(
      imageData => {
        const rutaLocalHost = window.Ionic.WebView.convertFileSrc(imageData);

        const filePath = imageData;
        this.base64.encodeFile(filePath).then(
          (base64File: string) => {
            this.newPost.image_base64 = base64File;
            this.newPost.image_new = rutaLocalHost;
          },
          err => {
            // console.log(err);
          }
        );
      },
      err => {
        // Handle error
      }
    );
  }

  loadPictureBase64() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagenBase64(options);
  }


  borrarFoto() {
    this.newPost.image_new = '';
    this.newPost.image_base64 = undefined;
    this.changeEditImage = true;
  }

}

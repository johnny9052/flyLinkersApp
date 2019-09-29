import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HelperService } from '../../util/HelperService';
import { MasterPageService } from '../../services/master-page.service';
import { ModelPosts } from '../../interfaces/posts';
import { PostService } from '../../services/post.service';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from '../../util/blockAccess';


@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.page.html',
  styleUrls: ['./master-page.page.scss']
})
export class MasterPagePage implements OnInit {
  posts: ModelPosts[] = [];

  codeUser = '';

  tiempoEspera = 1000;

  constructor(
    private blockAccess: BlockAccessService,
    private actionSheetCtrl: ActionSheetController,
    private masterPageService: MasterPageService,
    public helperService: HelperService,
    private postService: PostService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getPostsData(this.codeUser);
    });
  }

  getPostsData(pkUser) {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.masterPageService.getPosts(pkUser).subscribe(data => {
      let res: any;
      res = data;
      this.posts = res.posts;
      this.helperService.ocultarBarraCarga();
      this.getMetadataPosts();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert(this.translate.instant('error'), this.translate.instant('errorCargandoInformacion'));
      // console.log('oops', error);
    });
  }

  getMetadataPosts() {

    this.posts.forEach(postTemp => {

    if (this.helperService.isValidValue(postTemp.external_url_new)) {
      this.masterPageService.getMetadataPosts(postTemp.external_url_new).subscribe(
        data => {
          let res: any;
          res = data;
          // Se obtiene la informacion basica del perfil
          postTemp.metadataDescription = res.description[0];
          postTemp.metadataImage = res.image[0];
          postTemp.metadataTitle = res.title[0];
        },
        error => {
          // console.log('oops', error);
        }
      );
    }


    });
  }

  generarLikePost(pkPost: string) {
    const like = {
      pk_post: pkPost,
      pk_profile: this.codeUser,
    };

    this.postService.generarLikePost(like).then(response => {
      // setTimeout(() => {
      //   this.getPostsData(this.codeUser);
      // }, this.tiempoEspera);
      // posts

      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.posts.length ; x++) {
        if (this.posts[x].id_new === pkPost) {
          this.posts[x].liked_by_user[0] = !this.posts[x].liked_by_user[0];
          if (this.posts[x].liked_by_user[0] === true) {
            this.posts[x].likes++;
          } else {
            this.posts[x].likes--;
          }
          break;
        }
      }

    });
  }

  viewPost(idNew) {

  }

  deletePost(pkPost: string) {
    const comment = {
      pk_post: pkPost,
    };
    this.postService.deletePost(comment).then(response => {
      setTimeout(() => {
        this.getPostsData(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  async presentActionSheet(pk: string) {

    const actionSheet = await this.actionSheetCtrl.create({
      // header: 'Albums',
      backdropDismiss: false,
      buttons: [
        {
          text: this.translate.instant('borrar'),
          role: 'destructive',
          icon: 'trash',
          cssClass: 'rojo',
          handler: () => {
            // console.log('Delete clicked');
            this.deletePost(pk);
          }
        },
        {
          text: this.translate.instant('editar'),
          icon: 'create',
          handler: () => {
            const data: NavigationExtras = {
              state: {
                idPost: pk
              }
            };

            this.router.navigate(['new-post'], data);
          }
        },
        {
          text: this.translate.instant('cancelar'),
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  openPage(url: string) {
    if (url !== 'undefined' && url !== undefined && url !== null) {
      this.helperService.abrirUrlExterna(url);
    }
  }


  openDetailPost(idPost) {

    const data: NavigationExtras = {
      state: {
        idPost
      }
    };

    this.router.navigate(['view-detail-post'], data);
  }



  sharedPost(content: string, externalUrlNew: string, imageNew: string, title: string) {

    const data: NavigationExtras = {
      state: {
        content,
        externalUrlNew,
        imageNew,
        title
      }
    };

    this.router.navigate(['new-post'], data);
  }


  recargar() {
    window.location.reload();
  }



}

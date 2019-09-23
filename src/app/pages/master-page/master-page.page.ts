import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HelperService } from '../../util/HelperService';
import { MasterPageService } from '../../services/master-page.service';
import { ModelPosts } from '../../interfaces/posts';
import { PostService } from '../../services/post.service';
import { Router, NavigationExtras } from '@angular/router';


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
    private actionSheetCtrl: ActionSheetController,
    private masterPageService: MasterPageService,
    public helperService: HelperService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
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
    this.masterPageService.getPosts(pkUser).subscribe(data => {
      let res: any;
      res = data;
      this.posts = res.posts;
      this.getMetadataPosts();
    });
  }

  getMetadataPosts() {

    this.posts.forEach(postTemp => {

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
          console.log('oops', error);
        }
      );


    });
  }

  generarLikePost(pkPost: string) {
    const like = {
      pk_post: pkPost,
      pk_profile: this.codeUser,
    };

    this.postService.generarLikePost(like).then(response => {
      setTimeout(() => {
        this.getPostsData(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  viewPost(idNew){

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
      header: 'Albums',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          cssClass: 'rojo',
          handler: () => {
            console.log('Delete clicked');
            this.deletePost(pk);
          }
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            console.log('Edit clicked');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  openPage(url: string) {
    if (url !== 'undefined' && url !== undefined && url !== null){
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
}

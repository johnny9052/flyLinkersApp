import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  PopoverController
} from '@ionic/angular';
import { HelperService } from '../../util/HelperService';
import { PostService } from '../../services/post.service';
import {
  ModelPosts,
  ModelComments,
  ModelRecomments,
  ModelCommentData,
  ModelRecommentData
} from '../../interfaces/posts';
import { PopcommentsComponent } from 'src/app/components/popcomments/popcomments.component';
import { PoprecommentsComponent } from '../../components/poprecomments/poprecomments.component';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BlockAccessService } from '../../util/blockAccess';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-view-detail-post',
  templateUrl: './view-detail-post.page.html',
  styleUrls: ['./view-detail-post.page.scss']
})
export class ViewDetailPostPage implements OnInit {
  post = {} as ModelPosts;
  comment = {} as ModelCommentData;
  comments: ModelComments[] = [];
  recomment = {} as ModelRecommentData;
  recomments: ModelRecomments[] = [];

  idPost = '';
  codeUser = '';

  tiempoEspera = 1000;

  hiddenComments = true;
  hiddenRecomments = false;

  constructor(private blockAccess: BlockAccessService,
              private actionSheetCtrl: ActionSheetController,
              private postService: PostService,
              public helperService: HelperService,
              public alertCtrl: AlertController,
              private popoverController: PopoverController,
              private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idPost = this.router.getCurrentNavigation().extras.state.idPost;
      }
    });
  }

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
      this.getPost(this.codeUser, this.idPost);
    });
  }

  getPost(pkUser, articleId) {
    this.postService.getPost(pkUser, articleId).subscribe(data => {
      let res: any;
      res = data;
      this.post = res.post;
      this.post.liked_by_user = res.post.liked_by_user[0];
      this.getMetadataPosts();
    });
  }

  async mostrarPop(evento, pk: string, comment: string, postId: string) {
    const popover = await this.popoverController.create({
      component: PopcommentsComponent,
      event: evento,
      backdropDismiss: false
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();
    if (data.item === 'Delete') {
      this.deleteComment(pk);
    }
    if (data.item === 'Edit') {
      this.editComment(pk, comment, postId);
    }
  }

  async mostrarPopRecomment(
    evento,
    pk: string,
    comment: string,
    postId: string,
    commentId: string
  ) {
    const popover = await this.popoverController.create({
      component: PoprecommentsComponent,
      event: evento,
      backdropDismiss: false
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();
    if (data.item === 'Delete') {
      this.deleteRecomment(pk, commentId);
    }
    if (data.item === 'Edit') {
      this.editRecomment(pk, comment, postId, commentId);
    }
  }




  getMetadataPosts() {
    this.postService.getMetadataPosts(this.post.external_url_new).subscribe(
      data => {
        let res: any;
        res = data;
        // Se obtiene la informacion basica del perfil
        this.post.metadataDescription = res.description[0];
        this.post.metadataImage = res.image[0];
        this.post.metadataTitle = res.title[0];
        this.getComments(this.idPost);
      },
      error => {
        // console.log('oops', error);
      }
    );
  }

  getComments(postId) {
    this.postService.getComments(postId, this.codeUser).subscribe(data => {
      let res: any;
      res = data;
      this.comments = res.comments;
      // this.showHideComments();
      // this.showHideRecomments();
    });
  }

  showHideComments() {
    this.hiddenComments = !this.hiddenComments;
  }


  getRecomments(commentId, postId, verRecomentarios?: boolean) {
    this.postService
      .getRecomments(commentId, postId, this.codeUser)
      .subscribe(data => {
        let res: any;
        res = data;
        this.recomments = res.recomments;

        if (verRecomentarios) {
         // tslint:disable-next-line: prefer-const
         for (let obj of this.comments) {
           if (obj.id_comment === commentId) {
             obj.hiddenRecomments =  false;
           }
         }
        } else {
          this.showHideRecomments(commentId);
        }
      });
  }


  showHideRecomments(commentId: string) {
    // tslint:disable-next-line: prefer-const
    for (let obj of this.comments) {
      if (obj.id_comment === commentId) {
        obj.hiddenRecomments =  !obj.hiddenRecomments;
      } else {
        obj.hiddenRecomments =  true;
      }
    }
  }

  generarLikePost(pkPost: string) {
    const like = {
      pk_post: pkPost,
      pk_profile: this.codeUser
    };

    this.postService.generarLikePost(like).then(response => {
      setTimeout(() => {
        // this.getPost(this.codeUser, pkPost);
        this.post.liked_by_user = !this.post.liked_by_user;

        if (this.post.liked_by_user === true) {
          this.post.likes++;
        } else {
          this.post.likes--;
        }

      }, this.tiempoEspera);
    });
  }

  saveComment(pkPost) {
    this.comment.pk_profile = this.codeUser;
    this.comment.pk_post = pkPost;
    this.postService.saveComment(this.comment).then(response => {
      setTimeout(() => {
        this.comment = {} as ModelCommentData;
        this.post.count_comments++;
        this.getComments(pkPost);
      }, this.tiempoEspera);
    });
  }

  saveRecomment(pkComment, postId) {
    this.recomment.pk_profile = this.codeUser;
    this.recomment.pk_comment = pkComment;
    this.postService.saveRecomment(this.recomment).then(response => {
      setTimeout(() => {
        this.aumentarNumeroRecomentarios(pkComment);
        this.recomment = {} as ModelRecommentData;
        this.getRecomments(pkComment, postId, true);
      }, this.tiempoEspera);
    });
  }

  generarLikeComment(pkComment: string) {
    const like = {
      pk_comment: pkComment,
      pk_profile: this.codeUser
    };

    this.postService.generarLikeComment(like).then(response => {
      setTimeout(() => {
        // this.getComments(this.codeUser);

        // tslint:disable-next-line: prefer-const
        for (let obj of this.comments) {
          // tslint:disable-next-line: radix
          if (parseInt(obj.id_comment) === parseInt(pkComment)) {
            obj.like_by_user = !obj.like_by_user;
            if (obj.like_by_user === true) {
              obj.likes++;
            } else {
              obj.likes--;
            }
          }
        }

      }, this.tiempoEspera);
    });
  }

  deleteComment(pkComment: string) {
    const comment = {
      pk_comment: pkComment
    };
    this.postService.deleteComment(comment).then(response => {
      setTimeout(() => {
        this.post.count_comments--;
        this.getComments(this.idPost);
      }, this.tiempoEspera);
    });
  }

  deleteRecomment(pkRecomment: string, commentId: string) {
    const Recomment = {
      pk_recomment: pkRecomment
    };
    this.postService.deleteRecomment(Recomment).then(response => {
      setTimeout(() => {
        // this.getComments(this.idPost);
        this.disminuirNumeroRecomentarios(commentId);
        this.getRecomments(commentId, this.idPost, true);
      }, this.tiempoEspera);
    });
  }

  deletePost(pkPost: string) {
    const comment = {
      pk_post: pkPost
    };
    this.postService.deletePost(comment).then(response => {
      setTimeout(() => {
        this.getMetadataPosts();
      }, this.tiempoEspera);
    });
  }

  async editComment(id: string, comment: string, postId: string) {
    const input = await this.alertCtrl.create({
      header: 'Editar',
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'comment',
          id: 'txtComment',
          type: 'text',
          value: comment,
          placeholder: 'Ingrese el nuevo comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: async data => {
            // console.log('Confirm Ok', data);
            const objComment = {
              comment: data.comment,
              id_comment: id
            } as ModelComments;

            this.postService.editComment(objComment).then(response => {
              setTimeout(() => {
                this.getComments(postId);
              }, this.tiempoEspera);
            });
          }
        }
      ]
    });

    await input.present();
  }

  async editRecomment(id: string, recomment: string, postId: string, commentId: string) {
    const input = await this.alertCtrl.create({
      header: 'Editar',
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'recomment',
          id: 'txtRecomment',
          type: 'text',
          value: recomment,
          placeholder: 'Ingrese el nuevo comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: async data => {
            // console.log('Confirm Ok', data);

            const objRecomment = {
              recomment: data.recomment,
              recomment_id: id
            } as ModelRecomments;

            this.postService.editRecomment(objRecomment).then(response => {
              setTimeout(() => {
                // this.getComments(postId);
                this.getRecomments(commentId, postId, true);
              }, this.tiempoEspera);
            });
          }
        }
      ]
    });

    await input.present();
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
            // console.log('Delete clicked');
            this.deletePost(pk);
          }
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            // console.log('Edit clicked');
          }
        },
        {
          text: 'Cancel',
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
  viewProfile(idProfile: string) {
    const data: NavigationExtras = {
      state: {
        idProfile
      }
    };

    this.router.navigate(['profile-detail'], data);
  }





  aumentarNumeroRecomentarios(commentId: string) {
    // tslint:disable-next-line: prefer-const
    for (let obj of this.comments) {
      // tslint:disable-next-line: radix
      if (parseInt(obj.id_comment) === parseInt(commentId)) {
        console.log('Encontre el ' + commentId);
        obj.count_recomments++;
        break;
      }
    }
  }


  disminuirNumeroRecomentarios(commentId: string) {
    // tslint:disable-next-line: prefer-const
    for (let obj of this.comments) {
      // tslint:disable-next-line: radix
      if (parseInt(obj.id_comment) === parseInt(commentId)) {
        console.log('Encontre el ' + commentId);
        obj.count_recomments--;
        break;
      }
    }
  }



}





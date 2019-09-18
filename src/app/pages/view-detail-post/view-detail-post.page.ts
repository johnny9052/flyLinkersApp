import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { HelperService } from '../../util/HelperService';
import { PostService } from '../../services/post.service';
import { ModelPosts, ModelComments, ModelRecomments, ModelCommentData } from '../../interfaces/posts';


@Component({
  selector: 'app-view-detail-post',
  templateUrl: './view-detail-post.page.html',
  styleUrls: ['./view-detail-post.page.scss'],
})
export class ViewDetailPostPage implements OnInit {

  post = {} as ModelPosts;
  comment = {} as ModelCommentData;
  comments: ModelComments[] = [];
  recomments: ModelRecomments[] = [];

  codeUser = '';

  tiempoEspera = 1000;

  hiddenComments = true;
  hiddenRecomments = true;

  constructor(private actionSheetCtrl: ActionSheetController,
              private postService: PostService,
              public helperService: HelperService,
              public alertCtrl: AlertController) { }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  showHideComments() {
    this.hiddenComments = !this.hiddenComments;
  }

  showHideRecomments() {
    this.hiddenRecomments = !this.hiddenRecomments;
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      console.log(this.codeUser);
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getPost(this.codeUser, '88');
    });
  }

  getPost(pkUser, articleId) {
    this.postService.getPost(pkUser, articleId).subscribe(data => {
      let res: any;
      res = data;
      console.log(res.post);
      console.log('OJOOOOO');
      this.post = res.post;
      this.post.liked_by_user = res.post.liked_by_user[0];
      console.log(this.post.liked_by_user[0]);
      this.getMetadataPosts();
    });
  }

  getMetadataPosts() {
    this.postService.getMetadataPosts(this.post.external_url_new).subscribe(
      data => {
        let res: any;
        res = data;
        console.log('Llego la metadada!!! ', res);
        // Se obtiene la informacion basica del perfil
        this.post.metadataDescription = res.description[0];
        this.post.metadataImage = res.image[0];
        console.log(this.post.metadataImage);
        this.post.metadataTitle = res.title[0];
      },
      error => {
        console.log('oops', error);
      }
    );
  }

  getComments(postId) {
    this.postService.getComments(postId, this.codeUser).subscribe(data => {
      let res: any;
      res = data;
      console.log(res.comments);
      this.comments = res.comments;
      // this.comments.liked_by_user = res.post.liked_by_user[0];
      // console.log(this.post.liked_by_user[0]);
      this.showHideComments();
    });
  }

  getRecomments(commentId, postId) {
    this.postService.getRecomments(commentId, postId, this.codeUser).subscribe(data => {
      let res: any;
      res = data;
      console.log(res.recomments);
      this.recomments = res.recomments;
      // this.comments.liked_by_user = res.post.liked_by_user[0];
      // console.log(this.post.liked_by_user[0]);
      this.showHideRecomments();
    });
  }

  generarLikePost(pkPost: string) {
    const like = {
      pk_post: pkPost,
      pk_profile: this.codeUser,
    };

    this.postService.generarLikePost(like).then(response => {
      setTimeout(() => {
        this.getPost(this.codeUser, pkPost);
      }, this.tiempoEspera);
    });
  }

  saveComment(pkPost) {
    this.comment.pk_profile = this.codeUser;
    this.comment.pk_post = pkPost;
    this.postService.saveComment(this.comment).then(response => {
      setTimeout(() => {
        this.getPost(this.codeUser, pkPost);
      }, this.tiempoEspera);
    });
  }

  generarLikeComment(pkComment: string) {
    const like = {
      pk_comment: pkComment,
      pk_profile: this.codeUser,
    };

    this.postService.generarLikeComment(like).then(response => {
      setTimeout(() => {
        this.getComments(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  deleteComment(pkComment: string){
    const comment = {
      pk_comment: pkComment,
    };
    this.postService.deleteComment(comment).then(response => {
      setTimeout(() => {
        this.getComments(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  async editComment(id: string, comment: string, postId: string) {
    console.log(id);

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
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: async data => {
            console.log('Confirm Ok', data);

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

  async presentActionSheet(pk: string, action: string) {

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
            if(action === 'comment'){
              this.deleteComment(pk);
            }
            if(action === 'update'){
              this.editComment(pk, comment, postId)
            }
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

}

import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HelperService } from '../../util/HelperService';
import { PostService } from '../../services/post.service';
import { ModelPosts } from '../../interfaces/posts';

@Component({
  selector: 'app-view-detail-post',
  templateUrl: './view-detail-post.page.html',
  styleUrls: ['./view-detail-post.page.scss'],
})
export class ViewDetailPostPage implements OnInit {

  post = {} as ModelPosts;

  codeUser = '';

  constructor(private actionSheetCtrl: ActionSheetController,
              private postService: PostService,
              public helperService: HelperService) { }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
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
      this.post = res.post;
    });
  }

  async presentActionSheet() {

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

import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HelperService } from '../../util/HelperService';
import { MasterPageService } from '../../services/master-page.service';
import { ModelPostsData, ModelPosts } from '../../interfaces/posts';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.page.html',
  styleUrls: ['./master-page.page.scss']
})
export class MasterPagePage implements OnInit {
  posts: ModelPosts[] = [];

  codeUser = '';

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private masterPageService: MasterPageService,
    public helperService: HelperService
  ) {}

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
      this.getPostsData(this.codeUser);
    });
  }

  getPostsData(pkUser) {
    this.masterPageService.getPosts(pkUser).subscribe(data => {
      let res: any;
      res = data;
      console.log(res.posts);
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
          console.log('Llego la metadada!!! ', res);
          // Se obtiene la informacion basica del perfil
          // this.posts.metadataDescription = res.description[0];
          // this.posts.metadataImage = res.image[0];
          // this.posts.metadataTitle = res.title[0];
        },
        error => {
          console.log('oops', error);
        }
      );


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

import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HelperService } from '../../util/HelperService';
import { MasterPageService } from '../../services/master-page.service';
import { ModelPostsData } from '../../interfaces/posts';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.page.html',
  styleUrls: ['./master-page.page.scss'],
})
export class MasterPagePage implements OnInit {

  posts: ModelPostsData[] = [];

  codeUser = '';

  constructor(private actionSheetCtrl: ActionSheetController,
              private masterPageService: MasterPageService,
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
      this.getPostsData(this.codeUser);
    });
  }

  getPostsData(pkUser) {
    this.masterPageService.getPosts(pkUser).subscribe(data => {
      let res: any;
      res = data;
      console.log(res.posts);
      this.posts = res.posts;
      // console.log('Lo que tiene es ' + data[0].content );
      // tslint:disable-next-line: max-line-length
      // console.log((data.contactos_para_conectar[38].image_perfil !== '' ) ? data.contactos_para_conectar[38].image_perfil : 'https://flylinkers.com/media/avatar_2x.png');
    }
  );
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      backdropDismiss: false,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'rojo',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          console.log('Edit clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}

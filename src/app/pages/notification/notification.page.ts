import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ModelNotifications } from '../../interfaces/notifications';
import { HelperService } from '../../util/HelperService';
import { NetworkService } from '../../services/network.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications: ModelNotifications[] = [];

  codeUser = '';

  tiempoEspera = 1000;

  constructor(private actionSheetCtrl: ActionSheetController,
              private notificationsService: NotificationsService,
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
      this.getNotificationsData(this.codeUser);
    });
  }

  getNotificationsData(pkUser) {
    this.notificationsService.getNotifications(pkUser).subscribe(data => {
      console.log(data);
      let res: any;
      res = data;
      console.log(res.items);
      this.notifications = res.items;

      // console.log('Lo que tiene es ' + data.contactos_para_conectar[38].image_perfil );
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



  viewNotification(pk: string, type: string) {


    console.log(pk);

    const obj = {
      notification_item_pk: pk,
      typeNotification: type
    };

    this.notificationsService.viewNotification(obj);
  }

}

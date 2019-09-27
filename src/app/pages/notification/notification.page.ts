import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ModelNotifications } from '../../interfaces/notifications';
import { HelperService } from '../../util/HelperService';
import { NotificationsService } from '../../services/notifications.service';
import { Router, NavigationExtras } from '@angular/router';

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
              public helperService: HelperService,
              private router: Router) { }

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
      console.log(this.codeUser);
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getNotificationsData(this.codeUser);
    });
  }

  getNotificationsData(pkUser) {
    this.helperService.mostrarBarraDeCarga('Espere por favor');
    this.notificationsService.getNotifications(pkUser).subscribe(data => {
      console.log(data);
      let res: any;
      res = data;
      console.log(res.items);
      this.notifications = res.items;
      this.helperService.ocultarBarraCarga();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert('Error', 'Error cargando la informacion');
      console.log('oops', error);
    }
  );
  }

  viewNotification(pk: string, type: string, idPost: string) {
    console.log(pk);

    const obj = {
      notification_item_pk: pk,
      typeNotification: type
    };

    this.notificationsService.viewNotification(obj);
    if (idPost !== '-1' && idPost !== '-2') {
      this.openDetailPost(idPost);
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

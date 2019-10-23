import { Component, OnInit } from '@angular/core';
import { ActionSheetController, Events } from '@ionic/angular';
import { ModelNotifications } from '../../interfaces/notifications';
import { HelperService } from '../../util/HelperService';
import { NotificationsService } from '../../services/notifications.service';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from '../../util/blockAccess';
import { ValidateFullProfile } from '../../util/validateFullProfile';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications: ModelNotifications[] = [];

  codeUser = '';
  language = '';

  tiempoEspera = 1000;

  constructor(private blockAccess: BlockAccessService,
              private actionSheetCtrl: ActionSheetController,
              private notificationsService: NotificationsService,
              public helperService: HelperService,
              private router: Router,
              private translate: TranslateService,
              private events: Events,
              private validateFullProfileService: ValidateFullProfile) { }

  ngOnInit() {

  }



  ionViewWillEnter() {
    // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
    this.validateFullProfileService.validateDataFullProfile();
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
    // Se verifica si hay nuevas notificaciones para mostrar en pantalla
    // this.events.publish('post:notifications');
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      this.getLanguage();
    });
  }

  getLanguage() {
      // Se obtiene el identificador del usuario que ingreso al sistema
      this.helperService.getLocalData('language').then(response => {
        this.language = response;
        this.getNotificationsData();
      });
  }

  getNotificationsData() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.notificationsService.getNotifications(this.codeUser, this.language).subscribe(data => {
      // console.log(data);
      let res: any;
      res = data;
      // console.log(res.items);
      this.notifications = res.items;
      this.helperService.ocultarBarraCarga();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorCargandoInformacion'));
      // console.log('oops', error);
    }
  );
  }

  viewNotification(pk: string, type: string, idPost: string) {
    // console.log(pk);

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

}

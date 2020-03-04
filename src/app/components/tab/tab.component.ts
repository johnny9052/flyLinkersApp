import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Events } from '@ionic/angular';
import { HelperService } from 'src/app/util/HelperService';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ModelNotifications } from '../../interfaces/notifications';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() homeColor: string;
  @Input() networkColor: string;
  @Input() notificationsColor: string;
  @Input() messagesColor: string;
  @Input() newPostColor: string;
  @Input() profileColor: string;

  codeUser = '';
  language = '';
  notifications: ModelNotifications[] = [];
  totalUnreadNotifications = 0;

  constructor(
    public events: Events,
    public helperService: HelperService,
    private translate: TranslateService,
    private notificationsService: NotificationsService
  ) {
    /*Se registra el evento post:notifications, para que cuando este sea llamado
    cada vez que se carga una nueva pagina despues de que el usuario se identifique
    y que no sea un componente*/
    events.subscribe('post:notifications', () => {
      this.totalUnreadNotifications = 0;
      setTimeout(() => {
        this.getProfilePk();
      }, 1000);
    });
  }

  ngOnInit() {
    this.getProfilePk();
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
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.notificationsService
      .getNotifications(this.codeUser, this.language)
      .subscribe(
        data => {
          // console.log(data);
          let res: any;
          res = data;
          // console.log(res.items);
          this.notifications = res.items;
          // this.helperService.ocultarBarraCarga();
          this.getTotalUnreadNotifications();
        },
        error => {
          // this.helperService.ocultarBarraCarga();
          this.helperService.showAlert(
            this.translate.instant('errorTitulo'),
            this.translate.instant('errorCargandoInformacion')
          );
          // console.log('oops', error);
        }
      );
  }


  getTotalUnreadNotifications() {

    let cont = 0;
    
    console.log('ESTA ES LA INFO DE LAS NOTIFICACIONES');
    console.log(this.notifications);

    for (let obj of this.notifications) {
      if (obj.view === false) {
        cont++;
      }
    }

    this.totalUnreadNotifications = cont;
  }
}

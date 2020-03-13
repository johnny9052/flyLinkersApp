import { Component, OnInit } from '@angular/core';
import { ModelEvents } from '../../interfaces/eventsFly';
import { HelperService } from '../../util/HelperService';
import { EventsService } from '../../services/events.service';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from '../../util/blockAccess';
import { ValidateFullProfile } from '../../util/validateFullProfile';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  events: ModelEvents[] = [];

  codeUser = '';

  constructor(private blockAccess: BlockAccessService,
              private eventsService: EventsService,
              public helperService: HelperService,
              private translate: TranslateService,
              private validateFullProfileService: ValidateFullProfile) { }

  ngOnInit() {

  }


  ionViewWillEnter() {
    // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
    this.validateFullProfileService.validateDataFullProfile();
    this.getEventsData();
  }

  getEventsData() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.eventsService.getEvents().subscribe(data => {
      // console.log(data);
      let res: any;
      res = data;
      // console.log(res.events);
      this.events = res.events;
      this.helperService.ocultarBarraCarga();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorCargandoInformacion'));
      // console.log('oops', error);
    }
  );
  }
}

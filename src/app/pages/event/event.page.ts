import { Component, OnInit } from '@angular/core';
import { ModelEvents } from '../../interfaces/events';
import { HelperService } from '../../util/HelperService';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  events: ModelEvents[] = [];

  codeUser = '';

  constructor(private eventsService: EventsService,
              public helperService: HelperService) { }

  ngOnInit() {
    this.getEventsData();
  }

  getEventsData() {
    this.eventsService.getEvents().subscribe(data => {
      console.log(data);
      let res: any;
      res = data;
      console.log(res.events);
      this.events = res.events;

      // console.log('Lo que tiene es ' + data.contactos_para_conectar[38].image_perfil );
      // tslint:disable-next-line: max-line-length
      // console.log((data.contactos_para_conectar[38].image_perfil !== '' ) ? data.contactos_para_conectar[38].image_perfil : 'https://flylinkers.com/media/avatar_2x.png');
    }
  );
  }
}

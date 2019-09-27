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

  }


  ionViewWillEnter() {
    this.getEventsData();
  }

  getEventsData() {
    this.helperService.mostrarBarraDeCarga('Espere por favor');
    this.eventsService.getEvents().subscribe(data => {
      console.log(data);
      let res: any;
      res = data;
      console.log(res.events);
      this.events = res.events;
      this.helperService.ocultarBarraCarga();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert('Error', 'Error cargando la informacion');
      console.log('oops', error);
    }
  );
  }
}

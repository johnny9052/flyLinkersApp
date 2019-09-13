import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelEventsData } from '../interfaces/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient,
              public helperService: HelperService) { }

  getEvents() {
    return this.http.get<ModelEventsData>('https://flylinkers.com/es/content_network/get_events_app_full/');
  }
}

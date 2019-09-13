import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelNotifications } from '../interfaces/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient,
              public helperService: HelperService) { }

  getNotifications(pkUser: string) {
    return this.http.get<ModelNotifications>('https://flylinkers.com/es/notifications/get_notifications_app/?profile_pk=' + pkUser);
  }
}

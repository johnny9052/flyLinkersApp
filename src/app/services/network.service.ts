import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelNetworkData } from '../interfaces/network';
import { HelperService } from '../util/HelperService';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient,
              public helperService: HelperService) { }


  getContacts(pkUser: string) {
     return this.http.get<ModelNetworkData>('https://flylinkers.com/es/network/network_list_app/?profile_pk=' + pkUser);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelNetworkData, Componente } from '../interfaces/interfaces';
import { HelperService } from '../util/HelperService';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  /*Se inyecta la dependencia para poder usarlo
  como un servicio*/
  constructor(private http: HttpClient, public helperService: HelperService) { }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getJSONContacts() {
     return this.http.get<ModelNetworkData>('/assets/data/network.json');
    // return this.http.get<ModelNetworkData>('http://flylinkers.com/network/network_list_app?profile_pk=79');
  }
}

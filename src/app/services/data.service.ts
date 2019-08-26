import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SlidesObj, ModelSolicitudesRecibidas, ModelNetworkData, Componente } from '../interfaces/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  /*Se inyecta la dependencia para poder usarlo
  como un servicio*/
  constructor(private http: HttpClient) { }


  getSlidesList() {
    return this.http.get<SlidesObj[]>('/assets/data/slides.json');
  }

  getSolicitudesRecibidas() {
    return this.http.get<ModelSolicitudesRecibidas[]>('/assets/data/solicitudesRecibidas.json');
  }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getJSONContacts() {
    return this.http.get<ModelNetworkData>('/assets/data/network.json');
  }
}

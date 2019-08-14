import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SlidesObj } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /*Se inyecta la dependencia para poder usarlo
  como un servicio*/
  constructor(private http: HttpClient) { }


  getSlidesList() {
    /*Con el <Componente[]> se esta indicando que
    la informacion devuelta por el servicio es de
    tipo componente*/
    return this.http.get<SlidesObj[]>('/assets/data/slides.json');
  }
}

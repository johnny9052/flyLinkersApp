import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { HelperService } from '../util/HelperService';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  /*Dependencias del servicio
  http: Dependencia para las peticiones al servidor
  navCtrl: Dependencia para redireccionar a otras paginas
  alertCtrl: Depedencia para los modales,
  HelperService: Clase utilitaria
  Storage: Almacenamiento local*/
  constructor(private http: HttpClient,
              public alertCtrl: AlertController,
              public helperService: HelperService,
              private storage: Storage) { }







}

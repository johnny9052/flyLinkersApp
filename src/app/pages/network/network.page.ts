import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { ModelSolicitudesRecibidas, ModelSolicitudesEnviadas, ModelContactos, ModelContactosParaConectar } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {


  hiddenContact = true;
  hiddenRequests = true;
  hiddenPossibleContact = true;
  hiddenRequestsReceived = true;


  solicitudesRecibidas: ModelSolicitudesRecibidas[] = [];
  totalSolicitudesRecibidas: string;

  solicitudesEnviadas: ModelSolicitudesEnviadas[] = [];
  totalSolicitudesEnviadas: string;

  contactos: ModelContactos[] = [];
  totalContactos: string;

  contactosConectar: ModelContactosParaConectar[] = [];
  totalContactosConectar: string;


  constructor(private dataService: DataService) { }

  ngOnInit() {

     this.dataService.getJSONContacts().subscribe(data => {
         console.log(data);
         this.solicitudesRecibidas = data.solicitudes_recibidas;
         this.totalSolicitudesRecibidas = data.cantidad_solicitudes_recibidas[0];
         this.solicitudesEnviadas = data.solicitudes_enviadas;
         this.totalSolicitudesEnviadas = data.cantidad_solicitudes_enviadas[0];
         this.contactos = data.lista_contactos;
         this.totalContactos = data.cantidad_contactos[0];
         this.contactosConectar = data.contactos_para_conectar;
         this.totalContactosConectar = data.cantidad_contactos_para_conectar[0];
       }
     );
  }

  showHideContacts() {
    this.hiddenContact = !this.hiddenContact;
  }

  showHideRequest() {
    this.hiddenRequests = !this.hiddenRequests;
  }

  showHidePossibleContacts() {
    this.hiddenPossibleContact = !this.hiddenPossibleContact;
  }

  showHideRequestReceived() {
    this.hiddenRequestsReceived = !this.hiddenRequestsReceived;
  }


}

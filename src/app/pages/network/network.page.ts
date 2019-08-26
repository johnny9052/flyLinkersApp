import { Component, OnInit } from '@angular/core';
import { ModelSolicitudesRecibidas, ModelNetworkData, Componente, ModelSolicitudesEnviadas, ModelContactos, ModelContactosParaConectar } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {


  temp = {
    solicitudes_recibidas: [
        {
            pk: 179,
            fistName: 'Master',
            lastName: 'Flylinkers',
            headline: 'Master de flylinkers, encargado de generar contenidos en la red social.',
            profession: 'Community Manager',
            image_perfil: 'photos/Foto_Carolina.jpg'
        },
        {
            pk: 179,
            fistName: 'Pedro',
            lastName: 'Flylinkers',
            headline: 'Master de flylinkers, encargado de generar contenidos en la red social.',
            profession: 'Community Manager',
            image_perfil: 'photos/Foto_Carolina.jpg'
        }
    ]
};



  hiddenContact = true;
  hiddenRequests = true;
  hiddenPossibleContact = true;
  hiddenRequestsReceived = true;


  // networkModel: Observable<ModelNetworkData>;

  solicitudesRecibidas: ModelSolicitudesRecibidas[] = [];
  totalSolicitudesRecibidas: string;

  solicitudesEnviadas: ModelSolicitudesEnviadas[] = [];
  totalSolicitudesEnviadas: string;

  contactos: ModelContactos[] = [];
  totalContactos: string;

  contactosConectar: ModelContactosParaConectar[] = [];
  totalContactosConectar: string;

  componentes: Observable<Componente[]>;
  temp2: ModelSolicitudesRecibidas[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

     // this.componentes = this.dataService.getMenuOpts();

     // this.solicitudesRecibidas = this.dataService.getSolicitudesRecibidas();
     // this.solicitudesRecibidas.subscribe(x => console.log(x));

     // this.networkModel = this.dataService.getJSONContacts();
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

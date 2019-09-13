import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { ModelSolicitudesRecibidas, ModelSolicitudesEnviadas, ModelContactos, ModelContactosParaConectar } from '../../interfaces/interfaces';
import { HelperService } from '../../util/HelperService';
import { NetworkService } from '../../services/network.service';

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

  codeUser = '';


  constructor(private networkService: NetworkService,
              public helperService: HelperService) { }

  ngOnInit() {
     // Se obtiene el identidicador del usuario que ingreso al sistema
     this.getProfilePk();
  }



  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      console.log(this.codeUser);
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getContactsData(this.codeUser);
    });
  }


  getContactsData(pkUser) {
    this.networkService.getContacts(pkUser).subscribe(data => {
      console.log(data);
      console.log( data.lista_contactos);
      this.solicitudesRecibidas = data.solicitudes_recibidas;
      this.totalSolicitudesRecibidas = data.cantidad_solicitudes_recibidas[0];
      this.solicitudesEnviadas = data.solicitudes_enviadas;
      this.totalSolicitudesEnviadas = data.cantidad_solicitudes_enviadas[0];
      this.contactos = data.lista_contactos;
      this.totalContactos = data.cantidad_contactos[0];
      this.contactosConectar = data.contactos_para_conectar;
      this.totalContactosConectar = data.cantidad_contactos_para_conectar[0];

      // console.log('Lo que tiene es ' + data.contactos_para_conectar[38].image_perfil );
      // tslint:disable-next-line: max-line-length
      // console.log((data.contactos_para_conectar[38].image_perfil !== '' ) ? data.contactos_para_conectar[38].image_perfil : 'https://flylinkers.com/media/avatar_2x.png');
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

import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: max-line-length
import {
  ModelSolicitudesRecibidas,
  ModelSolicitudesEnviadas,
  ModelContactos,
  ModelContactosParaConectar
} from '../../interfaces/interfaces';
import { HelperService } from '../../util/HelperService';
import { NetworkService } from '../../services/network.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss']
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

  tiempoEspera = 1000;

  constructor(
    private networkService: NetworkService,
    public helperService: HelperService,
    private router: Router
  ) {}

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
      console.log(data.solicitudes_recibidas);
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
    });
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

  aceptarSolicitudAmistad(pk: string, status: boolean) {
    let aceptar;
    let rechazar;

    if (status) {
      aceptar = 'True';
      rechazar = 'False';
    } else {
      aceptar = 'False';
      rechazar = 'True';
    }

    const solicitud = {
      pk_sender: pk,
      pk_receiver: this.codeUser,
      send_connection: 'False',
      accept_connection: aceptar,
      reject_connection: rechazar
    };

    this.networkService.aceptarSolicitudAmistad(solicitud).then(response => {
      setTimeout(() => {
        this.getContactsData(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  enviarSolicitudAmistad(pk: string) {

    const solicitud = {
      pk_sender: this.codeUser,
      pk_receiver: pk,
      send_connection: 'True',
      accept_connection: 'False',
      reject_connection: 'False'
    };

    this.networkService.enviarSolicitudAmistad(solicitud).then(response => {
      setTimeout(() => {
        this.getContactsData(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  cancelarSolicitudAmistad(pk: string) {

    const solicitud = {
      pk_sender: this.codeUser,
      pk_receiver: pk,
      send_connection: 'False',
      accept_connection: 'False',
      reject_connection: 'True'
    };

    this.networkService.cancelarSolicitudAmistad(solicitud).then(response => {
      setTimeout(() => {
        this.getContactsData(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  eliminarAmistad(pkSenderUser: string ,pkReceiverUser: string) {

    const solicitud = {
      pk_sender: pkSenderUser,
      pk_receiver: pkReceiverUser,
      send_connection: 'False',
      accept_connection: 'False',
      reject_connection: 'True'
    };

    this.networkService.eliminarAmistad(solicitud).then(response => {
      setTimeout(() => {
        this.getContactsData(this.codeUser);
      }, this.tiempoEspera);
    });
  }


  viewProfile(idProfile: string) {
    const data: NavigationExtras = {
      state: {
        idProfile
      }
    };

    this.router.navigate(['profile-detail'], data);
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
// tslint:disable-next-line: max-line-length
import {
  ModelSolicitudesRecibidas,
  ModelSolicitudesEnviadas,
  ModelContactos,
  ModelContactosParaConectar
} from "../../interfaces/interfaces";
import { HelperService } from "../../util/HelperService";
import { NetworkService } from "../../services/network.service";
import { Router, NavigationExtras } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BlockAccessService } from "../../util/blockAccess";
import { ValidateFullProfile } from "../../util/validateFullProfile";
import { IonInfiniteScroll, Events } from "@ionic/angular";

@Component({
  selector: "app-network",
  templateUrl: "./network.page.html",
  styleUrls: ["./network.page.scss"]
})
export class NetworkPage implements OnInit {
  /*El viewChild se utiliza cuando se quiere hacer referencia a algun
  componente grafico del HTML*/
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

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
  contactoABuscar: string;

  codeUser = "";

  tiempoEspera = 1000;

  networkTextSearch = "";

  totalContactosAMostrarEnListado = 10;

  constructor(
    private blockAccess: BlockAccessService,
    private networkService: NetworkService,
    public helperService: HelperService,
    private router: Router,
    private translate: TranslateService,
    private validateFullProfileService: ValidateFullProfile,
    public events: Events
  ) {}

  ngOnInit() {
    /*Se obtiene el identidicador del usuario que ingreso al sistema, esto
    posteriormente desencadena el listado de los posts */
    this.getProfilePk();
  }

  ionViewWillEnter() {
    // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
    this.validateFullProfileService.validateDataFullProfile();
    // Se obtiene el identidicador del usuario que ingreso al sistema

    // Se verifica si hay nuevas notificaciones para mostrar en pantalla
    this.events.publish("post:notifications");
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then(response => {
      this.codeUser = response;
      // console.log(this.codeUser);
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getContactsData(this.codeUser);
    });
  }

  getContactsData(pkUser) {
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    this.networkService.getContacts(pkUser).subscribe(
      data => {
        // console.log(data);
        // console.log(data.solicitudes_recibidas);
        this.solicitudesRecibidas = data.solicitudes_recibidas;
        this.totalSolicitudesRecibidas = data.cantidad_solicitudes_recibidas;
        this.solicitudesEnviadas = data.solicitudes_enviadas;
        this.totalSolicitudesEnviadas = data.cantidad_solicitudes_enviadas;
        this.contactos = data.lista_contactos;
        this.totalContactos = data.cantidad_contactos;

        /*Primero se pinto la informacion adicional, ya la lista de contactos como es tan
      pesada, se ejecuta medio segundo despues, para que la info basica se refresque y
      posteriormente se pase a esta informacion*/
        setTimeout(() => {
          this.contactosConectar = data.contactos_para_conectar;
          this.totalContactosConectar = data.cantidad_contactos_para_conectar;
          /*Como en la lista de contactos llega el mismo usuario que se encuentra conectado, se
       elimina de la lista*/
          this.deleteProfileUser();
          this.deleteUsuariosPeticionesRealizadas();
        }, 500);

        this.helperService.ocultarBarraCarga();
      },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorCargandoInformacion")
        );
        // console.log('oops', error);
      }
    );
  }

  refreshPost(event) {
    this.networkService.getContacts(this.codeUser).subscribe(
      data => {
        this.solicitudesRecibidas = data.solicitudes_recibidas;
        this.totalSolicitudesRecibidas = data.cantidad_solicitudes_recibidas[0];
        this.solicitudesEnviadas = data.solicitudes_enviadas;
        this.totalSolicitudesEnviadas = data.cantidad_solicitudes_enviadas[0];
        this.contactos = data.lista_contactos;
        this.totalContactos = data.cantidad_contactos[0];
        this.contactosConectar = data.contactos_para_conectar;
        this.totalContactosConectar = data.cantidad_contactos_para_conectar[0];
        this.deleteProfileUser();
        this.deleteUsuariosPeticionesRealizadas();
        this.events.publish("post:notifications");
        event.target.complete();
      },
      error => {
        event.target.complete();
        this.helperService.showAlert(
          this.translate.instant("error"),
          this.translate.instant("errorCargandoInformacion")
        );
        // console.log('oops', error);
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

  aceptarSolicitudAmistad(pk: string, status: boolean) {
    let aceptar;
    let rechazar;

    if (status) {
      aceptar = "True";
      rechazar = "False";
    } else {
      aceptar = "False";
      rechazar = "True";
    }

    const solicitud = {
      pk_sender: pk,
      pk_receiver: this.codeUser,
      send_connection: "False",
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
      send_connection: "True",
      accept_connection: "False",
      reject_connection: "False"
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
      send_connection: "False",
      accept_connection: "False",
      reject_connection: "True"
    };

    this.networkService.cancelarSolicitudAmistad(solicitud).then(response => {
      setTimeout(() => {
        this.getContactsData(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  eliminarAmistad(pkSenderUser: string, pkReceiverUser: string) {
    const solicitud = {
      pk_sender: pkSenderUser,
      pk_receiver: pkReceiverUser,
      send_connection: "False",
      accept_connection: "False",
      reject_connection: "True"
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

    this.router.navigate(["profile-detail"], data);
  }

  deleteProfileUser() {
    let posicion = 0;

    /*El metodo trae al mismo usuario conectado como un usuario para poder contactar, por lo tanto se elimina de la lista*/
    for (let obj of this.contactosConectar) {
      // tslint:disable-next-line:radix
      if (parseInt(obj.pk) === parseInt(this.codeUser)) {
        this.contactosConectar.splice(posicion, 1);
        break;
      }
      posicion++;
    }
  }

  deleteUsuariosPeticionesRealizadas() {
    let posicion;
    /* Luego, vamos a quitar de la lista las solicitudes de amistad que uno como usuario ha enviado o que le han enviado */
    for (let obj of this.solicitudesEnviadas) {
      let position = this.contactosConectar
        .map(function(e) {
          return e.pk;
        })
        .indexOf(obj.pk);

      if (posicion !== -1 && posicion == "-1") {
        this.contactosConectar.splice(posicion, 1);
      }
    }


    for (let obj of this.solicitudesRecibidas) {
      let position = this.contactosConectar
        .map(function(e) {
          return e.pk;
        })
        .indexOf(obj.pk);

      if (posicion !== -1 && posicion == "-1") {
        this.contactosConectar.splice(posicion, 1);
      }
    }
  }

  networkSearchFilter(event) {
    this.networkTextSearch = event.detail.value;
    console.log(event);
  }

  loadMoreContacts(event) {
    setTimeout(() => {
      /* Si el total de contactos a mostrar es mayor o igual a lo disponible para mostrar, entonces de 
      deshabilita la barra de carga para cuando se quieran cargar mas registros */
      if (
        this.contactosConectar.length <= this.totalContactosAMostrarEnListado
      ) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      /* Se valida si el aumento de 10 nuevos registros a mostrar supera el total de todos los registros 
      disponibles a mostrar, si se superan se iguala la cantidad de registros a mostrar a la cantidad 
      total disponible, sino se aumenta en 10 */
      if (this.contactosConectar.length <= this.contactosConectar.length + 10) {
        this.totalContactosAMostrarEnListado += 10;
      } else {
        this.totalContactosAMostrarEnListado = this.contactosConectar.length;
      }

      event.target.complete();
    }, 1000);
  }
}

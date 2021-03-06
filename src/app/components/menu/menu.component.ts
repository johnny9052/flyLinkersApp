import { Component, OnInit } from "@angular/core";
import { HelperService } from "../../util/HelperService";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  codeUser = "";
  firstName = "";
  lastName = "";
  imagePerfil = "";

  constructor(public helperService: HelperService, public events: Events) {
    /*Se registra el evento user:login, para que cuando este sea llamado cuando el
    usuario se identifica correctamente, se actualice la informacion del menu, y
    toca ejecutarlo 1 segundo despues, dando tiempo que la informacion sea 
    almacenada de manera local*/
    events.subscribe("user:logIn", () => {
      setTimeout(() => {
        this.getProfilePk();
        this.getProfileFirstName();
        this.getProfileLastName();
        this.getProfileImage();
      }, 1000);
    });
  }

  ngOnInit() {
    // // console.log('Init desde el menu');
    this.getProfilePk();
    this.getProfileFirstName();
    this.getProfileLastName();
    this.getProfileImage();
  }

  ionViewWillEnter() {
    // // console.log('Init desde el menu');
    this.getProfilePk();
    this.getProfileFirstName();
    this.getProfileLastName();
    this.getProfileImage();
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then(response => {
      // console.log('El id es ' + response);
      // console.log(response);
      this.codeUser = response;
    });
  }

  getProfileFirstName() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("firstName").then(response => {
      // console.log('El nombre es ' + response);
      this.firstName = response;
    });
  }

  getProfileLastName() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("lastName").then(response => {
      // console.log('El apellido es ' + response);
      this.lastName = response;
    });
  }

  getProfileImage() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("image_perfil").then(response => {
      // console.log('La imagen de perfil es ' + response);
      this.imagePerfil = response;

      // tslint:disable-next-line: max-line-length
      this.imagePerfil = this.helperService.isValidValue(this.imagePerfil)
        ? "https://flylinkers.com/media/" + this.imagePerfil
        : "https://flylinkers.com/media/avatar_2x.png";
    });
  }
}

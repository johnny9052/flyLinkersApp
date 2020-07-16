import { Component, OnInit } from "@angular/core";

import { HelperService } from "../../util/HelperService";
import { ModelRegister } from "../../interfaces/register";
import { SecurityService } from "../../services/security.service";
import { TranslateService } from "@ngx-translate/core";
import { ModalController } from "@ionic/angular";
import { AssociatedEmailService } from "../../services/associated-email.service";
import { SendEmailsService } from 'src/app/services/send-emails.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {

  emails: any = [];

  /*Modelo del usuario que se enviara al servidor*/
  userNew = {} as ModelRegister;

  hero = { name: "" };

  terminosCondiciones = false;
  recibirBoletin = false;

  rutaTerminosReferencia = "";

  /*Dependencias utilizadas en el proyecto
  HelperService: Clase utilitaria
  SecurityService: Servicio para el envio de los datos*/
  constructor(
    public helperService: HelperService,
    private securityService: SecurityService,
    private associatedEmailService: AssociatedEmailService,
    private sendEmailService: SendEmailsService,
    private translate: TranslateService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.createURLPolicies();
  }

  /*Validacion de formulario https://angular.io/guide/form-validation*/

  registerUser() {
    if (this.terminosCondiciones) {
      if (this.userNew.password1 === this.userNew.password2) {
        if (this.recibirBoletin) {
          this.registerNewsLetterSubscription();
        } else {
          this.securityService.registerUser(this.userNew);
        }
      } else {
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("passwordsNoCoinciden")
        );
      }
    } else {
      this.helperService.showAlert(
        this.translate.instant("errorTitulo"),
        this.translate.instant("DebeAceptarTerminosCondiciones")
      );
    }
  }

  registerNewsLetterSubscription() {
    var d = new Date();
    let fechaSistema =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("email", this.userNew.email);
    postDataObj.append("names", this.userNew.first_name);
    postDataObj.append("lastNames", this.userNew.last_name);
    postDataObj.append("fecha", fechaSistema);
    postDataObj.append("tipo", "1");
    postDataObj.append("token", "fLyLiNkErSnEwSAsOcIaTeD");

    this.securityService.registerNewsLetterSubscription(postDataObj).subscribe(
      async (data) => {
        let respuesta: any;
        respuesta = data;

        /*Se envia el correo para su activacion*/
        const correos = await this.associatedEmailService.getAssociatedEmails();
        this.emails = JSON.parse(correos.data);
        this.emails.forEach((element) => {          
          if (element.mail === postDataObj.get("email")) {

            console.log(JSON.stringify(element));

            this.sendEmailService
              .sendEmailsValidate(element)
              .then((re) => {
                console.log(re);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });

        this.securityService.registerUser(this.userNew);
      },
      (error) => {
        this.securityService.registerUser(this.userNew);
      }
    );
  }

  openPage() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("language").then((response) => {
      const url = "https://flylinkers.com/" + response + "/privacy-policies";

      if (url !== "undefined" && url !== undefined && url !== null) {
        this.helperService.abrirUrlExterna(url);
      }
    });
  }

  createURLPolicies() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("language").then((response) => {
      const url = "https://flylinkers.com/" + response + "/privacy-policies";

      if (url !== "undefined" && url !== undefined && url !== null) {
        this.rutaTerminosReferencia = url;
      }
    });
  }
}

import { Component, OnInit, NgZone } from "@angular/core";
import {
  ModelUserData,
  Skills,
  Experiences,
  Accomplishments,
  Interests,
  EventsFly
} from "../../interfaces/userInterface";
import { HelperService } from "src/app/util/HelperService";
import { ProfileService } from "src/app/services/profile.service";
import { TranslateService } from "@ngx-translate/core";
import { BlockAccessService } from "../../util/blockAccess";
import { ValidateFullProfile } from "../../util/validateFullProfile";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = "";

  /*******VARIABLES DE CONTROL VISUAL****************/
  hiddenSkills = true;
  hiddenExperiences = true;
  hiddenAccomplishments = true;
  hiddenInterests = true;
  hiddenEvents = true;

  /****************OBJETOS************************** */
  userData = {} as ModelUserData;
  userSkills: Skills[] = [];
  userExperiences: Experiences[] = [];
  userAccomplishments: Accomplishments[] = [];
  userInterests: Interests[] = [];
  events: EventsFly[] = [];
  /****************END OBJETOS************************** */

  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public profileService: ProfileService,
    private translate: TranslateService,
    private validateFullProfileService: ValidateFullProfile,
    public eventsAction: Events,
    private zone: NgZone
  ) {
    /* Se define un evento para poder renderizar la pagina en cualquier momento */
    this.eventsAction.subscribe("updateScreenProfile", () => {
      this.zone.run(() => {
        console.log("force update the screen");
      });
    });
  }

  ionViewWillEnter() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  ngOnInit() {}

  /******************************************************/
  /*********FUNCIONES DE CONTROL GRAFICO ****************/
  /******************************************************/

  showHideSkills() {
    this.hiddenSkills = !this.hiddenSkills;
  }

  showHideExperiences() {
    this.hiddenExperiences = !this.hiddenExperiences;
  }

  showHideAccomplishments() {
    this.hiddenAccomplishments = !this.hiddenAccomplishments;
  }

  showHideInterests() {
    this.hiddenInterests = !this.hiddenInterests;
  }

  showHideEvents() {
    this.hiddenEvents = !this.hiddenEvents;
  }

  /******************************************************/
  /*********END FUNCIONES DE CONTROL GRAFICO ************/
  /******************************************************/

  /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then(response => {
      this.codeUser = response;
      // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
      this.validateFullProfileService.validateDataFullProfile();
      // console.log(this.codeUser);
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getProfileData(this.codeUser);
    });
  }

  /*Funcion que se encarga de traer toda la informacion del perfil del usuario que se
  encuentra logueado*/
  getProfileData(pkUser: string) {
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getProfileData(pkUser).subscribe(
      data => {
        let res: any;
        res = data;
        console.log(res);
        // Se obtiene la informacion basica del perfil
        this.userData = res.profile[0];
        this.userSkills = res.skills;
        this.userAccomplishments = res.accomplishments;
        this.userInterests = res.interests;
        this.userExperiences = res.experiences;
        this.events = res.events;

        // tslint:disable-next-line: max-line-length
        this.userData.image_perfil = this.helperService.isValidValue(
          this.userData.image_perfil
        )
          ? "https://flylinkers.com/media/" + this.userData.image_perfil
          : "https://flylinkers.com/media/avatar_2x.png";

        this.helperService.ocultarBarraCarga();

        /* Se llama al evento que renderiza la pagina */
        this.eventsAction.publish("updateScreenProfile");
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

  openExternalURL(link: string) {
    window.open(link, "_system");
  }

  renderizarYa(){
    this.eventsAction.publish("updateScreenProfile");
  }

}

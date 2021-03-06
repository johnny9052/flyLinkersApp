import { Component, OnInit } from "@angular/core";
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
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BlockAccessService } from "../../util/blockAccess";
import { ValidateFullProfile } from "../../util/validateFullProfile";
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { DenunciarUsuarioPage } from "../denunciar-usuario/denunciar-usuario.page";
import { ModelDenunciateUser } from "../../interfaces/denunciate";

@Component({
  selector: "app-profile-detail",
  templateUrl: "./profile-detail.page.html",
  styleUrls: ["./profile-detail.page.scss"]
})
export class ProfileDetailPage implements OnInit {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = "";

  codeUserOnlyDetail;

  hiddenSkills = false;
  hiddenExperiences = false;
  hiddenAccomplishments = false;
  hiddenInterests = false;
  hiddenEvents = false;

  /****************OBJETOS************************** */
  userData = {} as ModelUserData;
  userSkills: Skills[] = [];
  userExperiences: Experiences[] = [];
  userAccomplishments: Accomplishments[] = [];
  userInterests: Interests[] = [];
  events: EventsFly[] = [];
  /****************END OBJETOS************************** */


  urlBack;

  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private validateFullProfileService: ValidateFullProfile,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.codeUserOnlyDetail = this.router.getCurrentNavigation().extras.state.idProfile;
        this.urlBack = this.router.getCurrentNavigation().extras.state.urlBack;

        // console.log('Llego dato!!');
        // console.log(this.codeUserOnlyDetail);
      }

      // tslint:disable-next-line: max-line-length
      if (
        this.codeUserOnlyDetail !== undefined &&
        this.codeUserOnlyDetail !== "undefined" &&
        this.codeUserOnlyDetail !== null &&
        this.codeUserOnlyDetail !== "null" &&
        this.codeUserOnlyDetail !== ""
      ) {
        this.getProfileData(this.codeUserOnlyDetail);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
    this.validateFullProfileService.validateDataFullProfile();
  }

  ionViewWillLeave() {
    /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
    this.codeUser = "";

    this.codeUserOnlyDetail = "";

    this.hiddenSkills = true;
    this.hiddenExperiences = true;
    this.hiddenAccomplishments = true;
    this.hiddenInterests = true;
    this.hiddenEvents = true;

    /****************OBJETOS************************** */
    this.userData = {} as ModelUserData;
    this.userSkills = [];
    this.userExperiences = [];
    this.userAccomplishments = [];
    this.userInterests = [];
    // tslint:disable-next-line: no-unused-expression
    this.events = [];
    /****************END OBJETOS************************** */
  }

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

  /*Funcion que se encarga de traer toda la informacion del perfil del usuario que se
encuentra logueado*/
  getProfileData(pkUser: string) {
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getProfileData(pkUser).subscribe(
      data => {
        let res: any;
        res = data;
        // console.log(res);
        // Se obtiene la informacion basica del perfil
        this.userData = res.profile[0];
        this.userSkills = res.skills;
        this.userAccomplishments = res.accomplishments;
        this.userInterests = res.interests;
        this.userExperiences = res.experiences;
        this.events = res.events;

        this.recortarFechas();
        this.ocultarListadosDatos();

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

  openExternalURL(link: string) {
    window.open(link, "_system");
  }

  async presentActionSheetNotUser(pkUserToDenunciate: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      // header: 'Albums',
      backdropDismiss: false,
      buttons: [
        {
          text: this.translate.instant("denunciar"),
          role: "destructive",
          icon: "flag",
          cssClass: "rojo",
          handler: () => {
            // console.log('Delete clicked');
            this.abrirModalDenunciarUser(pkUserToDenunciate);
          }
        },
        {
          text: this.translate.instant("cancelar"),
          icon: "close",
          role: "cancel",
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async abrirModalDenunciarUser(pkUserToDenunciate: string) {
    const modal = await this.modalCtrl.create({
      component: DenunciarUsuarioPage,
      componentProps: {
        pkUserToDenunciate,
        codeUser: this.codeUser
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    console.log("Datos a enviar al web service", data);

    if (this.helperService.isValidValue(data)) {
      const newDenunce = data as ModelDenunciateUser;
      this.profileService.denunciateUser(newDenunce);
    }
  }

  recortarFechas() {
    this.events.forEach(element => {
      element.event_init_date = element.event_init_date.substring(0, 10);
      element.event_end_date = element.event_end_date.substring(0, 10);
    });
  }

  ocultarListadosDatos() {
    setTimeout(() => {
      this.hiddenSkills = true;
      this.hiddenExperiences = true;
      this.hiddenAccomplishments = true;
      this.hiddenInterests = true;
      this.hiddenEvents = true;
    }, 100);
  }



  backToPrevPage(){
    setTimeout(() => {
      this.navCtrl.navigateBack(this.urlBack);
    }, 1);
  }
}

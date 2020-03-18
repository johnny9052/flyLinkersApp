import { Component, OnInit } from "@angular/core";
import {
  ModelUserData,
  Skills,
  Experiences,
  Accomplishments,
  Interests
} from "../../interfaces/userInterface";
import { HelperService } from "../../util/HelperService";
import { ProfileService } from "../../services/profile.service";
import {
  AlertController,
  ModalController
} from "@ionic/angular";
import { ProfileEditExperiencePage } from "../profile-edit-experience/profile-edit-experience.page";
import { ModelRegister } from "../../interfaces/register";

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

import { Base64 } from "@ionic-native/base64/ngx";
import { TranslateService } from "@ngx-translate/core";
import { BlockAccessService } from "../../util/blockAccess";

/*Variable global declarada para que no se marque error al momento de utilizar
el resultado de la camara como un file y no como base64*/
declare var window: any;

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
  /*******END VARIABLES DE CONTROL VISUAL****************/

  /*Almacena la configuracion del calendar*/
  customPickerOptions;

  /*El tiempo espera es utilizado para que, cuando se agregue un nuevo elemento como un skill o 
  similares, se de un tiempo suficiente para almacenar y poder actualizar la lista con todos los
  nuevos elementos*/
  tiempoEspera = 1500;
  

  /****************OBJETOS************************** */
  userData = {} as ModelUserData;
  userSkills: Skills[] = [];
  userExperiences: Experiences[] = [];
  userAccomplishments: Accomplishments[] = [];
  userInterests: Interests[] = [];
  /****************END OBJETOS************************** */

  /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    ProfileService: Servicio para el consumo de web services del perfil
    AlertController: Permite mostrar alerts emergentes en pantalla */
  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public profileService: ProfileService,
    public alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private camera: Camera,
    private base64: Base64,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
    // Se configura el calendar
    this.customPickerOptions = {
      buttons: [
        {
          text: this.translate.instant("seleccionar"),
          handler: evento => {
            this.userData.birthday_date =
              evento.year.value +
              "-" +
              evento.month.value +
              "-" +
              evento.day.value;
          }
        },
        {
          text: this.translate.instant("cancelar"),
          handler: evento => {
            // console.log('close');
          }
        }
      ]
    };
  }

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

        // tslint:disable-next-line: max-line-length
        this.userData.image_perfil = this.helperService.isValidValue(
          this.userData.image_perfil
        )
          ? "https://flylinkers.com/media/" + this.userData.image_perfil
          : "https://flylinkers.com/media/avatar_2x.png";
        this.helperService.ocultarBarraCarga();
      },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("ErrorCargandoInformacion")
        );
        // console.log('oops', error);
      }
    );
  }



  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS SKILLS***********/
  /******************************************************/


  getListSkillData() {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getListSkillUser(this.codeUser).subscribe(
      data => {
        let res: any;
        res = data;
        // console.log(res);
        // Se obtiene la informacion basica del perfil

        this.userSkills = res.skill;
      },
      error => {
        // console.log('oops', error);
      }
    );
  }

  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS SKILLS**********/
  /******************************************************/

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LA EXPERIENCIA*******/
  /******************************************************/

  getListExperienceData() {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getListExperienceUser(this.codeUser).subscribe(
      data => {
        let res: any;
        res = data;
        // console.log(res);
        // Se obtiene la informacion basica del perfil

        this.userExperiences = res.experiences;
      },
      error => {
        // console.log('oops', error);
      }
    );
  }

  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS EXPERIENCIA*****/
  /******************************************************/

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS ACCOMPLISHMENTS**/
  /******************************************************/

  
  getListAccomplishmentData() {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getListAccomplishmentUser(this.codeUser).subscribe(
      data => {
        let res: any;
        res = data;
        // console.log(res);
        // Se obtiene la informacion basica del perfil

        this.userAccomplishments = res.accomplishments;
      },
      error => {
        // console.log('oops', error);
      }
    );
  }


  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS ACCOMPLISHMENTS*/
  /******************************************************/

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS INTERESES********/
  /******************************************************/

  
  getListInterestsData() {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getListInterestsUser(this.codeUser).subscribe(
      data => {
        let res: any;
        res = data;
        // console.log(res);
        this.userInterests = res.interests;
      },
      error => {
        // console.log('oops', error);
      }
    );
  }

  
  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS SKILLS**********/
  /******************************************************/


}

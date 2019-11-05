import { Component, OnInit } from '@angular/core';
import {
  Profile,
  ModelUserData,
  Skills,
  Experiences,
  Accomplishments,
  Interests
} from '../../interfaces/userInterface';
import { HelperService } from '../../util/HelperService';
import { ProfileService } from '../../services/profile.service';
import { AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { ProfileEditExperiencePage } from '../profile-edit-experience/profile-edit-experience.page';
import { ModelRegister } from '../../interfaces/register';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Base64 } from '@ionic-native/base64/ngx';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from '../../util/blockAccess';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/*Variable global declarada para que no se marque error al momento de utilizar
el resultado de la camara como un file y no como base64*/
declare var window: any;

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss']
})
export class ProfileEditPage implements OnInit {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = '';

  /*******VARIABLES DE CONTROL VISUAL****************/
  hiddenSkills = true;
  hiddenExperiences = true;
  hiddenAccomplishments = true;
  hiddenInterests = true;
  hiddenEvents = true;
  /*Almacena la configuracion del calendar*/
  customPickerOptions;

  tiempoEspera = 1500;
  /*******END VARIABLES DE CONTROL VISUAL****************/

  /****************OBJETOS************************** */
  profile = {} as Profile;
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
  constructor(private blockAccess: BlockAccessService,
              public helperService: HelperService,
              public profileService: ProfileService,
              public alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private camera: Camera,
              private base64: Base64,
              private translate: TranslateService,
  ) {}

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
    // Se configura el calendar
    this.customPickerOptions = {
      buttons: [
        {
          text: this.translate.instant('seleccionar'),
          handler: evento => {
            this.userData.birthday_date =
              evento.year.value +
              '-' +
              evento.month.value +
              '-' +
              evento.day.value;
          }
        },
        {
          text: this.translate.instant('cancelar'),
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
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      // console.log(this.codeUser);
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getProfileData(this.codeUser);
    });
  }

  /*Funcion que se encarga de traer toda la informacion del perfil del usuario que se
  encuentra logueado*/
  getProfileData(pkUser: string) {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
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

        // tslint:disable-next-line: max-line-length
        this.userData.image_perfil = (this.helperService.isValidValue(this.userData.image_perfil)) ? 'https://flylinkers.com/media/' + this.userData.image_perfil : 'https://flylinkers.com/media/avatar_2x.png';
        this.helperService.ocultarBarraCarga();
      },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('ErrorCargandoInformacion'));
        // console.log('oops', error);
      }
    );
  }

  /*Funcion que se encarga que actualizar la informacion del perfil del usuario que se encuentre logueado*/
  saveProfileData() {

    // tslint:disable-next-line: max-line-length
    this.userData.image_perfil_base64 = (this.helperService.isValidValue(this.userData.image_perfil_base64)) ? this.userData.image_perfil_base64 : '-1';

    this.profileService.saveProfileDataService(this.userData);
  }

  /******************************************************/
  /*********FUNCIÓN CAMBIAR CONTRASEÑA ******************/
  /******************************************************/
  async changePassword() {
    const input = await this.alertCtrl.create({
      header: this.translate.instant('cambiarPassword'),
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'lastPassword',
          id: 'txtLastPassword',
          type: 'password',
          placeholder: this.translate.instant('ingresePasswordActual')
        },
        {
          name: 'newPassword',
          id: 'txtNewPassword',
          type: 'password',
          placeholder: this.translate.instant('ingresePasswordNuevo')
        },
        {
          name: 'confirmPassword',
          id: 'txtConfirmPassword',
          type: 'password',
          placeholder: this.translate.instant('repitaPasswordNuevo')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('cambiar'),
          handler: async data => {
            // console.log('Confirm Ok', data);

            if (data.newPassword === data.confirmPassword) {
              const changePassword = {
                password1: data.lastPassword,
                password2: data.newPassword,
                userPk: this.codeUser
              } as ModelRegister;

              this.profileService.changePassword(changePassword);
            } else {
              this.helperService.showAlert(
                this.translate.instant('errorTitulo'),
                this.translate.instant('passwordsNoCoinciden')
              );
            }
          }
        }
      ]
    });

    await input.present();
  }

  async deactivateAccount() {
    const input = await this.alertCtrl.create({
      header: this.translate.instant('desactivarCuenta'),
      // message: 'Ingrese su nueva skill',
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('aceptar'),
          handler: async data => {
            // console.log('Confirm Ok', data);

            const user = {
              userPk: this.codeUser
            } as ModelRegister;

            this.profileService.deactivateAccount(user);
          }
        }
      ]
    });

    await input.present();
  }

  /******************************************************/
  /*********FIN FUNCIÓN CAMBIAR CONTRASEÑA **************/
  /******************************************************/

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS SKILLS***********/
  /******************************************************/

  async createSkill() {
    const input = await this.alertCtrl.create({
      header: this.translate.instant('crear'),
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'skill',
          id: 'txtSkill',
          type: 'text',
          placeholder: this.translate.instant('ingreseSkill')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('ok'),
          handler: async data => {
            // console.log('Confirm Ok', data);

            const newSkill = {
              skill_description: data.skill,
              pk: this.codeUser
            } as Skills;

            this.profileService.saveSkillService(newSkill).then(response => {
              setTimeout(() => {
                this.getListSkillData();
              }, this.tiempoEspera);
            });
          }
        }
      ]
    });

    await input.present();
  }

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

  async deleteSkill(id: string) {
    // console.log(id);

    const alert = await this.alertCtrl.create({
      header: this.translate.instant('eliminarSkill'),
      message: this.translate.instant('deseaEliminarSkill'),
      buttons: [
        {
          text:  this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            // console.log('Cancelar');
          }
        },
        {
          text:  this.translate.instant('aceptar'),
          cssClass: 'secondary',
          handler: async blah => {
            // console.log('Boton OK ');
            const objSkill = {
              pk: id
            } as Skills;

            this.profileService.deleteSkillService(objSkill).then(response => {
              setTimeout(() => {
                this.getListSkillData();
              }, this.tiempoEspera);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async editSkill(id: string, description: string) {
    // console.log(id);

    const input = await this.alertCtrl.create({
      header:  this.translate.instant('editar'),
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'skill',
          id: 'txtSkill',
          type: 'text',
          value: description,
          placeholder:  this.translate.instant('ingreseSkill')
        }
      ],
      buttons: [
        {
          text:  this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('ok'),
          handler: async data => {
            // console.log('Confirm Ok', data);

            const objSkill = {
              skill_description: data.skill,
              pk: id
            } as Skills;

            this.profileService.editSkillService(objSkill).then(response => {
              setTimeout(() => {
                this.getListSkillData();
              }, this.tiempoEspera);
            });
          }
        }
      ]
    });

    await input.present();
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

  /*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
  async crearNuevaExperiencia() {
    const modal = await this.modalCtrl.create({
      component: ProfileEditExperiencePage,
      componentProps: {
        pk: this.codeUser
      }
    });

    await modal.present();

    /* Con esta linea se captura los datos retornados por el modal*/
    const { data } = await modal.onDidDismiss();

    // console.log('Retorno del modal ', data);

    if (data !== 'undefined' && data !== undefined && data !== null && data !== 'null') {
      const newExperience = data as Experiences;

      this.profileService
        .saveExperienceService(newExperience)
        .then(response => {
          setTimeout(() => {
            this.getListExperienceData();
          }, this.tiempoEspera);
        });
    }
  }

  /*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
  async editarExperiencia(
    id: string,
    title: string,
    company: string,
    location: string,
    initDate: string,
    endDate: string,
    currentlyWorking: string,
    headlineExperience: string,
    descriptionExperience: string
  ) {
    const modal = await this.modalCtrl.create({
      component: ProfileEditExperiencePage,
      componentProps: {
        pk: this.codeUser,
        id,
        title,
        company,
        location,
        initDate,
        endDate,
        currentlyWorking,
        headlineExperience,
        descriptionExperience
      }
    });

    await modal.present();

    /* Con esta linea se captura los datos retornados por el modal*/
    const { data } = await modal.onDidDismiss();
    // console.log('Retorno del modal ', data);

    if (data !== 'undefined' && data !== undefined && data !== null && data !== 'null') {
      const editExperience = data as Experiences;

      const temp = {
        id: data.id,
        title: data.title,
        company: data.company,
        location: data.location,
        init_date: data.init_date,
        headline_experience: data.headline_experience,
        description_experience: data.description_experience,
        currently_working: data.currently_working
      } as Experiences;

      this.profileService.editExperienceService(temp).then(response => {
        setTimeout(() => {
          this.getListExperienceData();
        }, this.tiempoEspera);
      });
    }
  }

  async deleteExperience(id: string) {
    // console.log(id);

    const alert = await this.alertCtrl.create({
      header:  this.translate.instant('eliminar'),
      message: this.translate.instant('deseaEliminarExperiencia'),
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            // console.log('Cancelar');
          }
        },
        {
          text: this.translate.instant('aceptar'),
          cssClass: 'secondary',
          handler: async blah => {
            // console.log('Boton OK ');
            const objExperience = {
              pk: id
            } as Experiences;

            this.profileService
              .deleteExperienceService(objExperience)
              .then(response => {
                setTimeout(() => {
                  this.getListExperienceData();
                }, this.tiempoEspera);
              });
          }
        }
      ]
    });

    await alert.present();
  }

  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS EXPERIENCIA*****/
  /******************************************************/

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS ACCOMPLISHMENTS**/
  /******************************************************/

  async createAccomplishment() {
    const input = await this.alertCtrl.create({
      header: this.translate.instant('crear'),
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'accomplishment',
          id: 'txtAccomplishment',
          type: 'text',
          placeholder: this.translate.instant('ingreseLogro')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('ok'),
          handler: async data => {
            // console.log('Confirm Ok', data);

            const newAccomplishment = {
              accomplishment_description: data.accomplishment,
              pk: this.codeUser
            } as Accomplishments;

            this.profileService
              .saveAccomplishmentService(newAccomplishment)
              .then(response => {
                setTimeout(() => {
                  this.getListAccomplishmentData();
                }, this.tiempoEspera);
              });
          }
        }
      ]
    });

    await input.present();
  }

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

  async deleteAccomplishment(id: string) {
    // console.log(id);

    const alert = await this.alertCtrl.create({
      header: this.translate.instant('eliminar'),
      message: this.translate.instant('deseaEliminarLogro'),
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            // console.log('Cancelar');
          }
        },
        {
          text: this.translate.instant('aceptar'),
          cssClass: 'secondary',
          handler: async blah => {
            // console.log('Boton OK ');
            const objAccomplishment = {
              pk: id
            } as Accomplishments;

            this.profileService
              .deleteAccomplishmentService(objAccomplishment)
              .then(response => {
                setTimeout(() => {
                  this.getListAccomplishmentData();
                }, this.tiempoEspera);
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async editAccomplishment(id: string, description: string) {
    // console.log(id);

    const input = await this.alertCtrl.create({
      header: this.translate.instant('editar'),
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'accomplishment',
          id: 'txtAccomplishment',
          type: 'text',
          value: description,
          placeholder: this.translate.instant('ingreseLogro')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('ok'),
          handler: async data => {
            // console.log('Confirm Ok', data);

            const objAccomplishments = {
              accomplishment_description: data.accomplishment,
              pk: id
            } as Accomplishments;

            this.profileService
              .editAccomplishmentService(objAccomplishments)
              .then(response => {
                setTimeout(() => {
                  this.getListAccomplishmentData();
                }, this.tiempoEspera);
              });
          }
        }
      ]
    });

    await input.present();
  }

  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS ACCOMPLISHMENTS*/
  /******************************************************/

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS INTERESES********/
  /******************************************************/

  async createInterests() {
    const input = await this.alertCtrl.create({
      header: this.translate.instant('crear'),
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'interests',
          id: 'txtInterests',
          type: 'text',
          placeholder: this.translate.instant('ingreseInteres')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('ok'),
          handler: async data => {
            // console.log('Confirm Ok', data);

            const newInterest = {
              interest_description: data.interests,
              pk: this.codeUser
            } as Interests;

            this.profileService
              .saveInterestsService(newInterest)
              .then(response => {
                setTimeout(() => {
                  this.getListInterestsData();
                }, this.tiempoEspera);
              });
          }
        }
      ]
    });

    await input.present();
  }

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

  async deleteInterests(id: string) {
    // console.log(id);

    const alert = await this.alertCtrl.create({
      header: this.translate.instant('eliminar'),
      message: this.translate.instant('deseaEliminarInteres'),
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            // console.log('Cancelar');
          }
        },
        {
          text: this.translate.instant('aceptar'),
          cssClass: 'secondary',
          handler: async blah => {
            // console.log('Boton OK ');
            const objInterest = {
              pk: id
            } as Interests;
            this.profileService
              .deleteInterestsService(objInterest)
              .then(response => {
                setTimeout(() => {
                  this.getListInterestsData();
                }, this.tiempoEspera);
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async editInterests(id: string, description: string) {
    // console.log(id);

    const input = await this.alertCtrl.create({
      header: this.translate.instant('editar'),
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'interest',
          id: 'txtInterest',
          type: 'text',
          value: description,
          placeholder: this.translate.instant('ingreseInteres')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('ok'),
          handler: async data => {
            // console.log('Confirm Ok', data);

            const objInterest = {
              interest_description: data.interest,
              pk: id
            } as Interests;

            this.profileService
              .editInterestsService(objInterest)
              .then(response => {
                setTimeout(() => {
                  this.getListInterestsData();
                }, this.tiempoEspera);
              });
          }
        }
      ]
    });

    await input.present();
  }

  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS SKILLS**********/
  /******************************************************/

  takePictureBase64() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagenBase64(options);
  }

  procesarImagenBase64(options: CameraOptions) {
    this.camera.getPicture(options).then(
      imageData => {
        const rutaLocalHost = window.Ionic.WebView.convertFileSrc(imageData);

        const filePath = imageData;
        this.base64.encodeFile(filePath).then(
          (base64File: string) => {
            this.userData.image_perfil_base64 = base64File;
            this.userData.image_perfil = rutaLocalHost;
          },
          err => {
            // console.log(err);
          }
        );
      },
      err => {
        // Handle error
      }
    );
  }

  loadPictureBase64() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagenBase64(options);
  }



}

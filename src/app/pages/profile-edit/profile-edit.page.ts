import { Component, OnInit } from '@angular/core';
import { Profile, ModelUserData, Skills } from '../../interfaces/userInterface';
import { HelperService } from '../../util/HelperService';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {


  /*******VARIABLES DE CONTROL VISUAL****************/
  hiddenSkills = true;
  hiddenExperiences = true;
  hiddenAccomplishments = true;
  hiddenInterests = true;
  hiddenEvents = true;
  /*Almacena la configuracion del calendar*/
  customPickerOptions;
  /*******END VARIABLES DE CONTROL VISUAL****************/

  /****************OBJETOS************************** */
  profile = {} as Profile;
  userData = {} as ModelUserData;
  userSkills: Skills[] = [];
  /****************END OBJETOS************************** */


  codeUser = '';

  constructor(public helperService: HelperService,
              public profileService: ProfileService,
              public alertCtrl: AlertController) { }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
    // Se configura el calendar
    this.customPickerOptions = {
      buttons: [{
        text: 'Seleccionar',
        handler: ( evento ) => {
          this.userData.birthday_date = evento.year.value + '-' + evento.month.value + '-' + evento.day.value;
        }
      }, {
        text: 'Cancelar',
        handler: ( evento ) => {
          console.log('close');
        }
      }]
    };

    console.log('******************ENTRE******************************');
  }



  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getProfileData(this.codeUser);
    });
  }


  getProfileData(pkUser) {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getProfileData(pkUser).subscribe(data => {
        let res: any;
        res = data;
        console.log(res);
        // Se obtiene la informacion basica del perfil
        this.userData = res.profile[0];
        this.userSkills = res.skills;

        console.log(this.userSkills);
        // Se obtiene el listado de habilidades
      }, error => {
        console.log('oops', error);
      });
  }

  saveProfileData() {
    this.profileService.saveProfileDataService(this.userData);
  }





  async createSkill() {

    const input = await this.alertCtrl.create({
      header: 'Crear',
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'skill',
          id: 'txtSkill',
          type: 'text',
          placeholder: 'Ingrese su skill'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async ( data ) => {
            console.log('Confirm Ok', data);

            const newSkill = {
              skill_description: data.skill,
              pk: this.codeUser
            } as Skills;

            await this.profileService.saveSkillService(newSkill);
            this.getListSkillData();
          }
        }
      ]
    });

    await input.present();
  }





  getListSkillData() {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getListSkillUser(this.codeUser).subscribe(data => {
        let res: any;
        res = data;
        console.log(res);
        // Se obtiene la informacion basica del perfil

        this.userSkills = res.skill;

      }, error => {
        console.log('oops', error);
      });

  }


  async deleteSkill(id: string) {
    console.log(id);

    const alert = await this.alertCtrl.create({
      header: 'Eliminar skill',
      message: 'Desea eleminar esta skill?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Aceptar',
          cssClass: 'secondary',
          handler: async (blah) => {
            console.log('Boton OK ');
            const objSkill = {
              pk: id
            } as Skills;
            await this.profileService.deleteSkillService(objSkill);
            this.getListSkillData();
          }
        }
      ]
    });

    await alert.present();
  }

  async editSkill(id: string, description: string) {

    console.log(id);

    const input = await this.alertCtrl.create({
      header: 'Editar',
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'skill',
          id: 'txtSkill',
          type: 'text',
          value: description,
          placeholder: 'Ingrese su skill'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async ( data ) => {
            console.log('Confirm Ok', data);

            const objSkill = {
              skill_description: data.skill,
              pk: id
            } as Skills;

            await this.profileService.editSkillService(objSkill);
            this.getListSkillData();
          }
        }
      ]
    });

    await input.present();
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
}

import { Component, OnInit } from '@angular/core';
import { ModelUserData, Profile, Skills, Experiences, Accomplishments, Interests, Events } from '../../interfaces/userInterface';
import { HelperService } from 'src/app/util/HelperService';
import { ProfileService } from 'src/app/services/profile.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = '';

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
  events: Events[] = [];
  /****************END OBJETOS************************** */

  constructor(public helperService: HelperService,
              public profileService: ProfileService) { }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
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



  /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      console.log(this.codeUser);
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getProfileData(this.codeUser);
    });
  }

  /*Funcion que se encarga de traer toda la informacion del perfil del usuario que se
  encuentra logueado*/
  getProfileData(pkUser: string) {
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
      },
      error => {
        console.log('oops', error);
      }
    );
  }


  openExternalURL(link: string) {
    window.open(link, '_system');
  }


}

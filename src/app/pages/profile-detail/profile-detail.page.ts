import { Component, OnInit } from '@angular/core';
import {
  ModelUserData,
  Skills,
  Experiences,
  Accomplishments,
  Interests,
  Events
} from '../../interfaces/userInterface';
import { HelperService } from 'src/app/util/HelperService';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPage implements OnInit {

/*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
codeUser = '';

codeUserOnlyDetail;

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

constructor(
  public helperService: HelperService,
  public profileService: ProfileService,
  private route: ActivatedRoute,
  private router: Router
) {
  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {
      this.codeUserOnlyDetail = this.router.getCurrentNavigation().extras.state.idProfile;

      console.log('Llego dato!!');
      console.log(this.codeUserOnlyDetail);
    }

    // tslint:disable-next-line: max-line-length
    if (
      this.codeUserOnlyDetail !== undefined &&
      this.codeUserOnlyDetail !== 'undefined' &&
      this.codeUserOnlyDetail !== null &&
      this.codeUserOnlyDetail !== 'null' &&
      this.codeUserOnlyDetail !== ''
    ) {
      this.getProfileData(this.codeUserOnlyDetail);
    }
  });
}

ngOnInit() {}


ionViewWillEnter() {
  console.log('Entre');
}

ionViewWillLeave() {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  this.codeUser = '';

  this.codeUserOnlyDetail = '';

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
  this.helperService.mostrarBarraDeCarga('Espere por favor');
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
      this.helperService.ocultarBarraCarga();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert('Error', 'Error cargando la informacion');
      console.log('oops', error);
    }
  );
}

openExternalURL(link: string) {
  window.open(link, '_system');
}
}

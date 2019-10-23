import { Component, OnInit } from '@angular/core';
import { Interests } from '../../interfaces/userInterface';
import { HelperService } from 'src/app/util/HelperService';
import { ProfileService } from 'src/app/services/profile.service';
import { ThrowStmt } from '@angular/compiler';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from '../../util/blockAccess';
import { ValidateFullProfile } from '../../util/validateFullProfile';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
})
export class InterestsPage implements OnInit {
    codeUser = '';

    userInterests: Interests[] = [];

  constructor(private blockAccess: BlockAccessService,
              public helperService: HelperService,
              public profileService: ProfileService,
              private translate: TranslateService,
              private validateFullProfileService: ValidateFullProfile) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
     // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
     this.validateFullProfileService.validateDataFullProfile();
     // Se obtiene el identidicador del usuario que ingreso al sistema
     this.getProfilePk();
  }

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
        this.userInterests = res.interests;
        this.helperService.ocultarBarraCarga();
      },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorCargandoInformacion'));
        // console.log('oops', error);
      }
    );
  }

}

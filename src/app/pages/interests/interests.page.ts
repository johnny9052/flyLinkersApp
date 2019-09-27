import { Component, OnInit } from '@angular/core';
import { Interests } from '../../interfaces/userInterface';
import { HelperService } from 'src/app/util/HelperService';
import { ProfileService } from 'src/app/services/profile.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
})
export class InterestsPage implements OnInit {
    codeUser = '';

    userInterests: Interests[] = [];

  constructor(public helperService: HelperService,
              public profileService: ProfileService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
     // Se obtiene el identidicador del usuario que ingreso al sistema
     this.getProfilePk();
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
    this.helperService.mostrarBarraDeCarga('Espere por favor');
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.profileService.getProfileData(pkUser).subscribe(
      data => {
        let res: any;
        res = data;
        console.log(res);
        // Se obtiene la informacion basica del perfil
        this.userInterests = res.interests;
        this.helperService.ocultarBarraCarga();
      },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert('Error', 'Error cargando la informacion');
        console.log('oops', error);
      }
    );
  }

}

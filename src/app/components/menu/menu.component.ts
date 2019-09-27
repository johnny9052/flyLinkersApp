import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../util/HelperService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  codeUser = '';
  firstName = '';
  lastName = '';
  imagePerfil = '';

  constructor(public helperService: HelperService) { }

  ngOnInit() {
    console.log('Init desde el menu');
    this.getProfilePk();
    this.getProfileFirstName();
    this.getProfileLastName();
    this.getProfileImage();
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      console.log(response);
      this.codeUser = response;
    });
  }

  getProfileFirstName() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('firstName').then(response => {
      console.log(response);
      this.firstName = response;
    });
  }

  getProfileLastName() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('lastName').then(response => {
      console.log(response);
      this.lastName = response;
    });
  }

  getProfileImage() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('image_perfil').then(response => {
      console.log(response);
      this.imagePerfil = response;
    });
  }

}

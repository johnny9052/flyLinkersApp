import { Component, OnInit } from '@angular/core';
import { ModelUserData, ModelUserLogIn } from '../../interfaces/userInterface';
import { SecurityService } from '../../services/security.service';
import { HelperService } from '../../util/HelperService';
import { DenunciarUsuarioPage } from '../denunciar-usuario/denunciar-usuario.page';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.page.html',
  styleUrls: ['./identify.page.scss'],
})
export class IdentifyPage implements OnInit {

  userDataLogIn = {} as ModelUserLogIn;




  constructor(private securityService: SecurityService,
              public helperService: HelperService) { }

  ngOnInit() {
    this.userDataLogIn.username = '';
    this.userDataLogIn.password = '';
  }


  identify() {
    this.securityService.logInUser(this.userDataLogIn);
  }

  openPage(url: string) {
    if (url !== 'undefined' && url !== undefined && url !== null) {
      this.helperService.abrirUrlExterna(url);
    }
  }


}

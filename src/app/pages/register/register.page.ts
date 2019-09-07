import { Component, OnInit } from '@angular/core';


import { HelperService } from '../../util/HelperService';
import { ModelRegister } from '../../interfaces/register';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  /*Modelo del usuario que se enviara al servidor*/
  userNew =  {} as ModelRegister;


  /*Dependencias utilizadas en el proyecto
  HelperService: Clase utilitaria
  SecurityService: Servicio para el envio de los datos*/
  constructor(public helperService: HelperService,
              private securityService: SecurityService) {
              }

  ngOnInit() {
  }

   registerUser() {
       if (this.userNew.password1 === this.userNew.password2) {
         this.securityService.registerUser(this.userNew);
       } else {
         this.helperService.showAlert('Error', 'Las contraseñas no coinciden');
       }
  }




}

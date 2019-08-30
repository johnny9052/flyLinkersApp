import { Component, OnInit } from '@angular/core';


import { HelperService } from '../../util/HelperService';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  /*Modelo del usuario que se enviara al servidor*/
  nuevoUsuario = {
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: ''
  };


  /*Dependencias utilizadas en el proyecto
  HelperService: Clase utilitaria
  SecurityService: Servicio para el envio de los datos*/
  constructor(public helperService: HelperService,
              private securityService: SecurityService) {
              }

  ngOnInit() {
  }

   registerUser() {
       if (this.nuevoUsuario.password1 === this.nuevoUsuario.password2) {
         this.securityService.registerUser(this.nuevoUsuario);
       } else {
         this.helperService.showAlert('Error', 'Las contraseñas no coinciden');
       }
  }




}

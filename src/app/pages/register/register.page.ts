import { Component, OnInit } from '@angular/core';


import { HelperService } from '../../util/HelperService';
import { SecurityService } from '../../services/security.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  confirmPassword: string;

  nuevoUsuario = {
    email: '',
    password: '',
    nombre: '',
    apellido: ''
  };


  url = 'https://flylinkers.com/es/register/';

  constructor(public helperService: HelperService, private securityService: SecurityService, private http: HttpClient) { }

  ngOnInit() {
  }



   registerUser() {
       if (this.nuevoUsuario.password === this.confirmPassword) {
          console.log(this.nuevoUsuario);
          this.securityService.sendDataPost(this.nuevoUsuario, this.url);
       } else {
         console.log(this.nuevoUsuario);
         this.helperService.presentAlert('Error', 'Las contraseñas no coinciden');
       }
   }




}

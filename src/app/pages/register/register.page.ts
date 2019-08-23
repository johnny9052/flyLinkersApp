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

  nuevoUsuario = {
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: ''
  };


  url = 'http://127.0.0.1:8000/es/registerApp/';

  constructor(public helperService: HelperService, private securityService: SecurityService, private http: HttpClient) { }

  ngOnInit() {
  }



   registerUser() {
       if (this.nuevoUsuario.password1 === this.nuevoUsuario.password2) {
          this.securityService.sendDataPost(this.nuevoUsuario, this.url);
       } else {
         this.helperService.presentAlert('Error', 'Las contraseñas no coinciden');
       }
   }




}

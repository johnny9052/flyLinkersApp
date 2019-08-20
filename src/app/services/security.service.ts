import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private url = '';


  data = {
    email: 'johnny@ionic.com',
    password1: 'p4ssw0rd1on1c',
    password2: 'p4ssw0rd1on1c',
    first_name: 'Johnny Alexander',
    last_name: 'Salazar Cardona'
  };

   /*Se inyecta la dependencia para poder usarlo
  como un servicio*/
  constructor(private http: HttpClient) { }


  sendDataPost( postData, url: string ) {

    this.url = url;
    console.log(this.data);
    this.http.post(this.url, this.data)
    .subscribe(data => {
      console.log('Respuesta exitosa ', data);

     }, error => {
      console.log('Error', error);
    });

  }
}

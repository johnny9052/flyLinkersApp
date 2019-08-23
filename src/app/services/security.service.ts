import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private url = '';


   /*Se inyecta la dependencia para poder usarlo
  como un servicio*/
  constructor(private http: HttpClient) { }


  sendDataPost( postData, url: string ) {

    this.url = url;
    console.log(postData);
    this.http.post(this.url, postData )
    .subscribe(data => {
      console.log('Respuesta exitosa ', data);

     }, error => {
      console.log('Error', error);
    });

  }
}

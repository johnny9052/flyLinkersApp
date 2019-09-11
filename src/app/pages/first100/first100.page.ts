import { Component, OnInit } from '@angular/core';
import { ModeloFirst100 } from '../../interfaces/first100';
import { HelperService } from '../../util/HelperService';
import { First100Service } from '../../services/first100.service';

@Component({
  selector: 'app-first100',
  templateUrl: './first100.page.html',
  styleUrls: ['./first100.page.scss'],
})
export class First100Page implements OnInit {

  first100: ModeloFirst100[] = [];

  codeUser = '';

  constructor(private fisrt100Service: First100Service,
              public helperService: HelperService) { }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      console.log(this.codeUser);
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getFirst100Data(this.codeUser);
    });
  }

  getFirst100Data(pkUser) {
    this.fisrt100Service.getFirst100(pkUser).subscribe(data => {
      console.log(data);
      this.first100 = data.partners;

      // console.log('Lo que tiene es ' + data.contactos_para_conectar[38].image_perfil );
      // tslint:disable-next-line: max-line-length
      // console.log((data.contactos_para_conectar[38].image_perfil !== '' ) ? data.contactos_para_conectar[38].image_perfil : 'https://flylinkers.com/media/avatar_2x.png');
    }
  );
  }

}

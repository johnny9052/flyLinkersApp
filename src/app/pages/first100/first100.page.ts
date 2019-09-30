import { Component, OnInit } from '@angular/core';
import { ModeloFirst100 } from '../../interfaces/first100';
import { HelperService } from '../../util/HelperService';
import { First100Service } from '../../services/first100.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-first100',
  templateUrl: './first100.page.html',
  styleUrls: ['./first100.page.scss'],
})
export class First100Page implements OnInit {

  first100: ModeloFirst100[] = [];

  constructor(private fisrt100Service: First100Service,
              public helperService: HelperService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.getFirst100Data();
  }

  getFirst100Data() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.fisrt100Service.getFirst100().subscribe(data => {
      this.first100 = data.partners;
      this.helperService.ocultarBarraCarga();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorCargandoInformacion'));
      // console.log('oops', error);
    }
  );
  }

}

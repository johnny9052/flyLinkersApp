import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {

  constructor(private  popoverCtl: PopoverController) { }

  ngOnInit() {

  }

  seleccionarIdioma( valor: string) {
    // // console.log('item: ', valor);
    this.popoverCtl.dismiss({
      item: valor
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-poprecomments',
  templateUrl: './poprecomments.component.html',
  styleUrls: ['./poprecomments.component.scss'],
})
export class PoprecommentsComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  onClick(accion: string){

    console.log('accion:', accion);

    this.popoverCtrl.dismiss({
      item: accion
    });
  }

}

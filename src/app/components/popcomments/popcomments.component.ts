import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popcomments',
  templateUrl: './popcomments.component.html',
  styleUrls: ['./popcomments.component.scss'],
})
export class PopcommentsComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  onClick(accion: string){

    console.log('accion:', accion);

    this.popoverCtrl.dismiss({
      item: accion
    });
  }

}

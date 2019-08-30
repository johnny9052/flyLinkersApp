import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})

/*Se implementa AfterViewInit para poder hacer uso correcto de ngAfterViewInit */
export class LogInPage implements OnInit, AfterViewInit {

  /*Se selecciona el slide*/
  @ViewChild('slides', {static: false}) slides: IonSlides;


  constructor(private dataService: DataService) { }


  ngOnInit() {

  }

  /*En el llamado se llama a la funcion que se encargara de gestionar el bloqueo del slide*/
  ngAfterViewInit() {
    this.lockSwipes(true);
  }

  /*funcion que bloquea el slide*/
  lockSwipes(bool: boolean) {
    this.slides.lockSwipes(bool);
  }




}

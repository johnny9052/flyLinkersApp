import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SlidesObj } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  slides: Observable<SlidesObj[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.slides = this.dataService.getSlidesList();
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  @Input() homeColor: string;
  @Input() networkColor: string;
  @Input() notificationsColor: string;
  @Input() messagesColor: string;
  @Input() newPostColor: string;
  @Input() profileColor: string;

  constructor() { }

  ngOnInit() {}

}

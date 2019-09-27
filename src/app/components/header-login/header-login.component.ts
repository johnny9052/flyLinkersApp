import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class HeaderLoginComponent implements OnInit {

  @Input() titulo: string;
  @Input() botonRegreso: boolean;
  @Input() botonIngreso: boolean;

  constructor() { }

  ngOnInit() {}

}

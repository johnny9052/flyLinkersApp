import { Component, OnInit, Input } from '@angular/core';

import { HelperService } from '../../util/HelperService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Input() titulo: string;
  @Input() search: boolean;

  constructor(public helperService: HelperService) { }

  ngOnInit() {}

  logOut() {
    this.helperService.removeLocalData('profilePk');
    this.helperService.removeLocalData('firstName');
    this.helperService.removeLocalData('lastName');
    this.helperService.removeLocalData('image_perfil');
  }

}

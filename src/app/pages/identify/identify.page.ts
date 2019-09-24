import { Component, OnInit } from '@angular/core';
import { ModelUserData, ModelUserLogIn } from '../../interfaces/userInterface';
import { SecurityService } from '../../services/security.service';
import { HelperService } from '../../util/HelperService';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.page.html',
  styleUrls: ['./identify.page.scss'],
})
export class IdentifyPage implements OnInit {

  userDataLogIn = {} as ModelUserLogIn;





  constructor(private securityService: SecurityService,
              public helperService: HelperService) { }

  ngOnInit() {
    this.userDataLogIn.username = 'alexander9052@gmail.com';
    this.userDataLogIn.password = 'Dragon9052';
  }


  identify() {
    this.securityService.logInUser(this.userDataLogIn);
  }

  openPage(url: string) {
    if (url !== 'undefined' && url !== undefined && url !== null){
      this.helperService.abrirUrlExterna(url);
    }
  }


}

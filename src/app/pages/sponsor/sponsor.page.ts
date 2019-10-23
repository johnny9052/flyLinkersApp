import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from '../../util/blockAccess';
import { ValidateFullProfile } from '../../util/validateFullProfile';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.page.html',
  styleUrls: ['./sponsor.page.scss'],
})
export class SponsorPage implements OnInit {

  constructor(private blockAccess: BlockAccessService,
              private translate: TranslateService,
              private validateFullProfileService: ValidateFullProfile) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
    this.validateFullProfileService.validateDataFullProfile();
  }


}

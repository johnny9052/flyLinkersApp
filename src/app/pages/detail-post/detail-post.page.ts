import { Component, OnInit } from '@angular/core';
import { BlockAccessService } from '../../util/blockAccess';
import { ValidateFullProfile } from '../../util/validateFullProfile';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.page.html',
  styleUrls: ['./detail-post.page.scss'],
})
export class DetailPostPage implements OnInit {

  constructor(private blockAccess: BlockAccessService,
              private validateFullProfileService: ValidateFullProfile) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
    this.validateFullProfileService.validateDataFullProfile();
  }

}

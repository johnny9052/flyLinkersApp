import { Component, OnInit } from '@angular/core';
import { ModelUserData } from '../../interfaces/userInterface';
import { HelperService } from '../../util/HelperService';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  userData = {} as ModelUserData;

  codeUser = '';

  constructor(public helperService: HelperService,
              private storage: Storage) { }

  ngOnInit() {

    this.storage.get('profilePk').then((val) => {
      this.codeUser = val;
    });

  }

}

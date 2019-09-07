import { Component, OnInit } from '@angular/core';
import { Profile, ModelUserData } from '../../interfaces/userInterface';
import { HelperService } from '../../util/HelperService';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  profile = {} as Profile;
  userData = {} as ModelUserData;

  customPickerOptions;

  codeUser = '';

  constructor(public helperService: HelperService,
              public profileService: ProfileService) { }

  ngOnInit() {
    this.getProfilePk();

    this.customPickerOptions = {
      buttons: [{
        text: 'Seleccionar',
        handler: ( evento ) => {
          this.userData.birthday_date = evento.year.value + '-' + evento.month.value + '-' + evento.day.value;
        }
      }, {
        text: 'Cancelar',
        handler: ( evento ) => {
          console.log('close');
        }
      }]
    };
  }


  getProfilePk() {
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      this.getProfileData(this.codeUser);
    });
  }


  getProfileData(pkUser) {
    this.profileService.getProfileData(pkUser).subscribe(data => {
        let res: any;
        res = data;
        console.log(res);
        this.userData = res.profile[0];
      }, error => {
        console.log('oops', error);
      });
  }

  saveProfileData() {
    this.profileService.saveProfileDataService(this.userData);
  }
}

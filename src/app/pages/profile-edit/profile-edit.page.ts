import { Component, OnInit } from '@angular/core';
import { ModelUserData } from '../../interfaces/userInterface';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  userData = {} as ModelUserData;

  constructor() { }

  ngOnInit() {
  }

}

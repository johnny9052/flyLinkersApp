import { Component, OnInit } from '@angular/core';
import { ModelUserData } from '../../interfaces/userInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData = {} as ModelUserData;

  constructor() { }

  ngOnInit() {
  }

}

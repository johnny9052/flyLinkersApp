import { Component, OnInit } from '@angular/core';
import { ModelUserData } from '../../interfaces/userInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  hiddenSkills = true;
  hiddenExperiences = true;
  hiddenAccomplishments = true;
  hiddenInterests = true;
  hiddenEvents = true;
  
  userData = {} as ModelUserData;

  constructor() { }

  ngOnInit() {
  }

  showHideSkills(){
    this.hiddenSkills = !this.hiddenSkills;
  }

  showHideExperiences(){
    this.hiddenExperiences = !this.hiddenExperiences;
  }

  showHideAccomplishments(){
    this.hiddenAccomplishments = !this.hiddenAccomplishments;
  }

  showHideInterests(){
    this.hiddenInterests = !this.hiddenInterests;
  }

  showHideEvents(){
    this.hiddenEvents = !this.hiddenEvents;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Experiences } from '../../interfaces/userInterface';

@Component({
  selector: 'app-profile-edit-experience',
  templateUrl: './profile-edit-experience.page.html',
  styleUrls: ['./profile-edit-experience.page.scss']
})
export class ProfileEditExperiencePage implements OnInit {
  @Input() pk;
  @Input() id;
  @Input() title;
  @Input() company;
  @Input() location;
  @Input() initDate;
  @Input() endDate;
  @Input() currentlyWorking;
  @Input() headlineExperience;
  @Input() descriptionExperience;

  experiencia = {} as Experiences;

  /*Almacena la configuracion del calendar*/
  customPickerOptionsInicial;
  customPickerOptionsFinal;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Se configura el calendar
    this.customPickerOptionsInicial = {
      buttons: [
        {
          text: 'Seleccionar',
          handler: evento => {
            this.experiencia.init_date =
              evento.year.value +
              '-' +
              evento.month.value +
              '-' +
              evento.day.value;
          }
        },
        {
          text: 'Cancelar',
          handler: evento => {
            console.log('close');
          }
        }
      ]
    };

    // Se configura el calendar
    this.customPickerOptionsFinal = {
      buttons: [
        {
          text: 'Seleccionar',
          handler: evento => {
            this.experiencia.end_date =
              evento.year.value +
              '-' +
              evento.month.value +
              '-' +
              evento.day.value;
          }
        },
        {
          text: 'Cancelar',
          handler: evento => {
            console.log('close');
          }
        }
      ]
    };


    this.experiencia.id = this.id;
    this.experiencia.pk = this.pk;
    this.experiencia.title = this.title;
    this.experiencia.company = this.company;
    this.experiencia.location = this.location;
    this.experiencia.init_date = this.initDate;
    this.experiencia.end_date = this.endDate;
    this.experiencia.currently_working =  this.fixBoolean(String(this.currentlyWorking));
    this.experiencia.headline_experience = this.headlineExperience;
    this.experiencia.description_experience = this.descriptionExperience;

    console.log('El valor es', this.experiencia.currently_working);

  }

  fixBoolean(val: string) {
    if (val === 'true') {
      return 'True';
    }

    if (val === 'false') {
      return 'False';
    }
  }

  enviarDatosAlFormulario() {
    this.experiencia.pk = this.pk;
    this.modalCtrl.dismiss(this.experiencia);
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}

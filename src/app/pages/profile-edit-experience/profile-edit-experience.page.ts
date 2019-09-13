import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Experiences } from '../../interfaces/userInterface';

@Component({
  selector: 'app-profile-edit-experience',
  templateUrl: './profile-edit-experience.page.html',
  styleUrls: ['./profile-edit-experience.page.scss'],
})
export class ProfileEditExperiencePage implements OnInit {


  @Input() pk;

  experiencia = {} as Experiences;


  /*Almacena la configuracion del calendar*/
  customPickerOptionsInicial;
  customPickerOptionsFinal;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
        // Se configura el calendar
        this.customPickerOptionsInicial = {
          buttons: [{
            text: 'Seleccionar',
            handler: ( evento ) => {
              this.experiencia.init_date = evento.year.value + '-' + evento.month.value + '-' + evento.day.value;
            }
          }, {
            text: 'Cancelar',
            handler: ( evento ) => {
              console.log('close');
            }
          }]
        };

                // Se configura el calendar
        this.customPickerOptionsFinal = {
                  buttons: [{
                    text: 'Seleccionar',
                    handler: ( evento ) => {
                      this.experiencia.end_date = evento.year.value + '-' + evento.month.value + '-' + evento.day.value;
                    }
                  }, {
                    text: 'Cancelar',
                    handler: ( evento ) => {
                      console.log('close');
                    }
                  }]
                };
  }

  enviarDatosAlFormulario() {
    this.experiencia.pk = this.pk;
    this.modalCtrl.dismiss(this.experiencia);
  }


  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}

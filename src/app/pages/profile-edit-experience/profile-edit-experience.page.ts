import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Experiences } from "../../interfaces/userInterface";
import { TranslateService } from "@ngx-translate/core";
import { BlockAccessService } from "../../util/blockAccess";
import { HelperService } from "src/app/util/HelperService";

@Component({
  selector: "app-profile-edit-experience",
  templateUrl: "./profile-edit-experience.page.html",
  styleUrls: ["./profile-edit-experience.page.scss"]
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

  statusTrabajoActual: boolean;

  constructor(
    private blockAccess: BlockAccessService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public helperService: HelperService
  ) {}

  ngOnInit() {
    // Se configura el calendar
    this.customPickerOptionsInicial = {
      buttons: [
        {
          text: this.translate.instant("seleccionar"),
          handler: evento => {
            this.experiencia.init_date =
              evento.year.value +
              "-" +
              evento.month.value +
              "-" +
              evento.day.value;
          }
        },
        {
          text: this.translate.instant("cancelar"),
          handler: evento => {
            // console.log('close');
          }
        }
      ]
    };

    // Se configura el calendar
    this.customPickerOptionsFinal = {
      buttons: [
        {
          text: this.translate.instant("seleccionar"),
          handler: evento => {
            this.experiencia.end_date =
              evento.year.value +
              "-" +
              evento.month.value +
              "-" +
              evento.day.value;
          }
        },
        {
          text: this.translate.instant("cancelar"),
          handler: evento => {
            // console.log('close');
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
    this.experiencia.currently_working = this.fixBoolean(
      String(this.currentlyWorking)
    );

    this.actualizarValorGlobalTrabajoActual(this.currentlyWorking);

    this.experiencia.headline_experience = this.headlineExperience;
    this.experiencia.description_experience = this.descriptionExperience;

    // console.log('El valor es', this.experiencia.currently_working);
  }

  fixBoolean(val: string) {
    if (val === "true") {
      return "True";
    }

    if (val === "false") {
      return "False";
    }
  }

  enviarDatosAlFormulario() {
    // debugger;
    if (
      !this.helperService.isValidValue(this.experiencia.end_date) &&
      this.experiencia.currently_working === "False"
    ) {
      this.helperService.showAlert("error", "ingrese fecha fin");
    } else {
      this.experiencia.pk = this.pk;
      this.modalCtrl.dismiss(this.experiencia);
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  cambioTrabajoActual($event) {
    this.actualizarValorGlobalTrabajoActual($event.target.value);
  }

  actualizarValorGlobalTrabajoActual(estado: string) {
    if (estado === "True") {
      this.statusTrabajoActual = false;
    } else {
      this.statusTrabajoActual = true;
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ModelDenunciateUser } from 'src/app/interfaces/denunciate';
import { TranslateService } from '@ngx-translate/core';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-denunciar-usuario',
  templateUrl: './denunciar-usuario.page.html',
  styleUrls: ['./denunciar-usuario.page.scss'],
})
export class DenunciarUsuarioPage implements OnInit {

  @Input() pkUserToDenunciate;
  @Input() codeUser;

  denunciate = {} as ModelDenunciateUser;

  constructor(private blockAccess: BlockAccessService,
              private modalCtrl: ModalController,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  enviarDatosAlFormulario() {
    this.denunciate.pkUserToDenunce = this.pkUserToDenunciate;
    this.denunciate.codeUser = this.codeUser;
    this.modalCtrl.dismiss(this.denunciate);
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}

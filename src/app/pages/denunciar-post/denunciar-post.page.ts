import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { TranslateService } from '@ngx-translate/core';
import { ModelDenunciate } from '../../interfaces/denunciate';

@Component({
  selector: 'app-denunciar-post',
  templateUrl: './denunciar-post.page.html',
  styleUrls: ['./denunciar-post.page.scss'],
})
export class DenunciarPostPage implements OnInit {

  @Input() pkPost;
  @Input() codeUser;


  denunciate = {} as ModelDenunciate;

  constructor(private blockAccess: BlockAccessService,
              private modalCtrl: ModalController,
              private translate: TranslateService) { }

  ngOnInit() {
  }


  enviarDatosAlFormulario() {
    this.denunciate.pkPost = this.pkPost;
    this.denunciate.codeUser = this.codeUser;
    this.modalCtrl.dismiss(this.denunciate);
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }


}

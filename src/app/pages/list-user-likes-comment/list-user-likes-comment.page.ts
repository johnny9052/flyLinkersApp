import { Component, OnInit } from '@angular/core';
import { ModelContactosLikesComment } from 'src/app/interfaces/interfaces';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ActionSheetController, AlertController, PopoverController, NavController } from '@ionic/angular';
import { HelperService } from 'src/app/util/HelperService';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ValidateFullProfile } from 'src/app/util/validateFullProfile';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-user-likes-comment',
  templateUrl: './list-user-likes-comment.page.html',
  styleUrls: ['./list-user-likes-comment.page.scss'],
})
export class ListUserLikesCommentPage implements OnInit {

  contactosLikes: ModelContactosLikesComment[] = [];
  totalContactosLikes: string;

  idComment = "";
  codeUser = "";
  urlBack = "";

  constructor(
    private blockAccess: BlockAccessService,
    private actionSheetCtrl: ActionSheetController,    
    public helperService: HelperService,
    public alertCtrl: AlertController,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private validateFullProfileService: ValidateFullProfile,
    private postService: PostService,
    private navCtrl: NavController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idComment = this.router.getCurrentNavigation().extras.state.idComment;
        this.urlBack = this.router.getCurrentNavigation().extras.state.urlBack;
        this.helperService.saveLocalData("currentComentId", this.idComment);
      }
    });
  }

  ngOnInit() {
    /*Se obtiene el identidicador del usuario que ingreso al sistema, esto
    posteriormente desencadena el listado de los posts */
    this.getProfilePk();
  }

  ionViewWillEnter() {
    // Se valida si el usuario si ha diligenciado toda su informacion, para redireccionarlo a llenar su perfil
    this.validateFullProfileService.validateDataFullProfile();
    // Se obtiene el identidicador del usuario que ingreso al sistema

  }


  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then(response => {
      this.codeUser = response;
      this.getUserLikesComments();
    });
  }



  getUserLikesComments() {


    console.log(this.idComment);

    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    this.postService.getUserLikesComment(this.idComment, this.codeUser).subscribe(
      data => {
        // console.log(data);        
        this.totalContactosLikes = data.likes.length;
      
        /*Primero se pinto la informacion adicional, ya la lista de contactos como es tan
        pesada, se ejecuta medio segundo despues, para que la info basica se refresque y
        posteriormente se pase a esta informacion*/
        setTimeout(() => {
          this.contactosLikes = data.likes;          
        }, 500);

        this.helperService.ocultarBarraCarga();
      },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorCargandoInformacion")
        );
        // console.log('oops', error);
      }
    );
  }




  viewProfile(idProfile: string) {
    const data: NavigationExtras = {
      state: {
        idProfile
      }
    };

    this.router.navigate(["profile-detail"], data);
  }


  ocultarRegresar() {
    setTimeout(() => {
      this.navCtrl.navigateBack(this.urlBack);
    }, 1);

  }

}

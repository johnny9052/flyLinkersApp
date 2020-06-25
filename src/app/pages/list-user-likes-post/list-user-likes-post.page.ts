import { Component, OnInit } from '@angular/core';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ActionSheetController, AlertController, PopoverController } from '@ionic/angular';
import { HelperService } from 'src/app/util/HelperService';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ValidateFullProfile } from 'src/app/util/validateFullProfile';
import { NetworkService } from 'src/app/services/network.service';
import { ModelContactosLikesPost } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-user-likes-post',
  templateUrl: './list-user-likes-post.page.html',
  styleUrls: ['./list-user-likes-post.page.scss'],
})
export class ListUserLikesPostPage implements OnInit {

  contactosLikes: ModelContactosLikesPost[] = [];
  totalContactosLikes: string;

  idPost = "";
  codeUser = "";

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
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idPost = this.router.getCurrentNavigation().extras.state.idPost;
        this.helperService.saveLocalData("currentPostId", this.idPost);
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
      this.getUserLikesPost();
    });
  }



  getUserLikesPost() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    this.postService.getUserLikesPost(this.idPost, this.codeUser).subscribe(
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
}

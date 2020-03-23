import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import {
  ActionSheetController,
  Events,
  ModalController,
  IonInfiniteScroll
} from "@ionic/angular";
import { HelperService } from "../../util/HelperService";
import { MasterPageService } from "../../services/master-page.service";
import { ModelPosts } from "../../interfaces/posts";
import { PostService } from "../../services/post.service";
import { Router, NavigationExtras } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BlockAccessService } from "../../util/blockAccess";
import { ValidateFullProfile } from "../../util/validateFullProfile";
import { DenunciarPostPage } from "../denunciar-post/denunciar-post.page";
import { ModelDenunciate } from "../../interfaces/denunciate";



@Component({
  selector: "app-master-page",
  templateUrl: "./master-page.page.html",
  styleUrls: ["./master-page.page.scss"]
})
export class MasterPagePage implements OnInit {
  /*El viewChild se utiliza cuando se quiere hacer referencia a algun
  componente grafico del HTML*/
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

  posts: ModelPosts[] = [];

  codeUser = "";

  tiempoEspera = 1000;

  /*Variable utilizada como bandera para saber cuando ya se consulto noticias. Se utiliza para que solo cuando
  se consulto si existian noticias, y ademas efectivamente no se encontraron noticias entonces se muestra el mensaje
  de que no existe informacion que mostrar*/
  yaSeConsultoNoticias = false;

  totalContactosAMostrarEnListado = 0;

  constructor(
    private blockAccess: BlockAccessService,
    private validateFullProfileService: ValidateFullProfile,
    private actionSheetCtrl: ActionSheetController,
    private masterPageService: MasterPageService,
    public helperService: HelperService,
    private postService: PostService,
    private router: Router,
    private translate: TranslateService,
    public events: Events,
    private modalCtrl: ModalController,
    private zone: NgZone
  ) {
    /* Se define un evento para poder renderizar la pagina en cualquier momento */
    this.events.subscribe("updateScreenMasterPage", () => {
      this.zone.run(() => {
        console.log("force update the screen from master page");
      });
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

    // Se verifica si hay nuevas notificaciones para mostrar en pantalla
    this.events.publish("post:notifications");
  }


  renderizarYa() {
    this.events.publish("updateScreenMasterPage");
   }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then(response => {
      this.codeUser = response;
      // Se obtiene toda la informacion del usuario que ingreso al sistema
      this.getPostsData(this.codeUser);
    });
  }

  getPostsData(pkUser) {
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    this.masterPageService
      .getMetadataPostsByLimits(
        pkUser,
        this.totalContactosAMostrarEnListado,
        this.totalContactosAMostrarEnListado + 10
      )
      .subscribe(
        data => {
          let res: any;
          res = data;
          // console.log('Ya llego la info de los post');
          this.posts = res.posts;
          this.recortarFechas();
          this.helperService.ocultarBarraCarga();
          this.yaSeConsultoNoticias = true;
          this.getMetadataPosts();
          this.totalContactosAMostrarEnListado += 10;

          setTimeout(() => {
            this.renderizarYa();
          }, 1000);
        },
        error => {
          console.log("Error cargando info");
          this.helperService.ocultarBarraCarga();
          this.yaSeConsultoNoticias = true;
          this.helperService.showAlert(
            this.translate.instant("error"),
            this.translate.instant("errorCargandoInformacion")
          );
          // console.log('oops', error);
        }
      );
  }

  getMetadataPosts() {
    this.posts.forEach(postTemp => {
      if (postTemp.metadataOk != true) {
        postTemp.metadataOk = true;
        if (this.helperService.isValidValue(postTemp.external_url_new)) {
          this.masterPageService
            .getMetadataPosts(postTemp.external_url_new)
            .subscribe(
              data => {
                let res: any;
                res = data;
                // Se obtiene la informacion basica del perfil
                postTemp.metadataDescription = res.description[0];
                postTemp.metadataImage = res.image[0];
                postTemp.metadataTitle = res.title[0];
              },
              error => {
                // console.log('oops', error);
              }
            );
        }
      }
    });
  }

  generarLikePost(pkPost: string) {
    const like = {
      pk_post: pkPost,
      pk_profile: this.codeUser
    };

    this.postService.generarLikePost(like).then(response => {
      // setTimeout(() => {
      //   this.getPostsData(this.codeUser);
      // }, this.tiempoEspera);
      // posts

      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.posts.length; x++) {
        if (this.posts[x].id_new === pkPost) {
          this.posts[x].liked_by_user[0] = !this.posts[x].liked_by_user[0];
          if (this.posts[x].liked_by_user[0] === true) {
            this.posts[x].likes++;
          } else {
            this.posts[x].likes--;
          }
          break;
        }
      }
    });
  }

  viewPost(idNew) {}

  deletePost(pkPost: string) {
    const comment = {
      pk_post: pkPost
    };
    this.postService.deletePost(comment).then(response => {
      setTimeout(() => {
        this.getPostsData(this.codeUser);
      }, this.tiempoEspera);
    });
  }

  async presentActionSheet(pk: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      // header: 'Albums',
      backdropDismiss: false,
      buttons: [
        {
          text: this.translate.instant("borrar"),
          role: "destructive",
          icon: "trash",
          cssClass: "rojo",
          handler: () => {
            // console.log('Delete clicked');
            this.deletePost(pk);
          }
        },
        {
          text: this.translate.instant("editar"),
          icon: "create",
          handler: () => {
            const data: NavigationExtras = {
              state: {
                idPost: pk
              }
            };

            this.router.navigate(["new-post"], data);
          }
        },
        {
          text: this.translate.instant("cancelar"),
          icon: "close",
          role: "cancel",
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async presentActionSheetNotUser(pk: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      // header: 'Albums',
      backdropDismiss: false,
      buttons: [
        {
          text: this.translate.instant("denunciar"),
          role: "destructive",
          icon: "flag",
          cssClass: "rojo",
          handler: () => {
            // console.log('Delete clicked');
            this.abrirModalDenunciarPost(pk);
          }
        },
        {
          text: this.translate.instant("cancelar"),
          icon: "close",
          role: "cancel",
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async abrirModalDenunciarPost(pkPost: string) {
    const modal = await this.modalCtrl.create({
      component: DenunciarPostPage,
      componentProps: {
        pkPost,
        codeUser: this.codeUser
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (this.helperService.isValidValue(data)) {
      const newDenunce = data as ModelDenunciate;
      this.masterPageService.denunciatePost(newDenunce);
    }
  }

  openPage(url: string) {
    if (url !== "undefined" && url !== undefined && url !== null) {
      this.helperService.abrirUrlExterna(url);
    }
  }

  openDetailPost(idPost) {
    const data: NavigationExtras = {
      state: {
        idPost
      }
    };

    this.router.navigate(["view-detail-post"], data);
  }

  sharedPost(
    content: string,
    externalUrlNew: string,
    imageNew: string,
    title: string
  ) {
    const data: NavigationExtras = {
      state: {
        content,
        externalUrlNew,
        imageNew,
        title
      }
    };

    this.router.navigate(["new-post"], data);
  }

  recargar() {
    window.location.reload();
  }

  viewProfile(idProfile: string) {
    const data: NavigationExtras = {
      state: {
        idProfile
      }
    };

    this.router.navigate(["profile-detail"], data);
  }

  refreshPost(event) {
    this.totalContactosAMostrarEnListado = 0;

    this.masterPageService
      .getMetadataPostsByLimits(
        this.codeUser,
        this.totalContactosAMostrarEnListado,
        this.totalContactosAMostrarEnListado + 10
      )
      .subscribe(
        data => {
          let res: any;
          res = data;
          this.posts = res.posts;
          this.recortarFechas();
          event.target.complete();
          this.getMetadataPosts();
          this.totalContactosAMostrarEnListado += 10;
          this.events.publish("post:notifications");

          
          setTimeout(() => {
            this.renderizarYa();
          }, 1000);

        },
        error => {
          event.target.complete();
          this.helperService.showAlert(
            this.translate.instant("error"),
            this.translate.instant("errorCargandoInformacion")
          );
          // console.log('oops', error);
        }
      );
  }

  loadMoreContacts(event) {
    setTimeout(() => {
      /* Si el total de contactos a mostrar es mayor o igual a lo disponible para mostrar, entonces de 
      deshabilita la barra de carga para cuando se quieran cargar mas registros */
      if (this.posts.length <= this.totalContactosAMostrarEnListado) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      /* Se valida si el aumento de 10 nuevos registros a mostrar supera el total de todos los registros 
      disponibles a mostrar, si se superan se iguala la cantidad de registros a mostrar a la cantidad 
      total disponible, sino se aumenta en 10 */
      if (this.posts.length <= this.posts.length + 10) {
        this.totalContactosAMostrarEnListado += 10;
      } else {
        this.totalContactosAMostrarEnListado = this.posts.length;
      }

      event.target.complete();
    }, 1000);
  }

  loadMorePostByLimits(event) {
    this.masterPageService
      .getMetadataPostsByLimits(
        this.codeUser,
        this.totalContactosAMostrarEnListado,
        this.totalContactosAMostrarEnListado + 10
      )
      .subscribe(
        data => {
          let res: any;
          res = data;

          this.posts = this.posts.concat(res.posts);

          this.recortarFechas();
          event.target.complete();
          this.yaSeConsultoNoticias = true;
          this.getMetadataPosts();
          this.totalContactosAMostrarEnListado += 10;

          
          setTimeout(() => {
            this.renderizarYa();
          }, 1000);
        },
        error => {
          console.log("Error cargando info");
          event.target.complete();
          this.yaSeConsultoNoticias = true;
          this.helperService.showAlert(
            this.translate.instant("error"),
            this.translate.instant("errorCargandoInformacion")
          );
          // console.log('oops', error);
        }
      );
  }

  recortarFechas() {
    this.posts.forEach(element => {
      if (element.publication_date.length > 10) {
        console.log('entre');
        element.publication_date = element.publication_date.substring(0, 10);
      }
    });
  }
}

export interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}


export interface SlidesObj {
  img: string;
  titulo: string;
  desc: string;
  link: string;
}

export interface RequestTransactionData {
  mensaje: string;
  code: string;
}


export interface ModelSolicitudesRecibidas {
      pk: string;
      fistName: string;
      lastName: string;
      headline: string;
      profession: string;
      image_perfil: string;
}


export interface ModelContactosLikesPost {
  id_author: string;
  id_comment: string;
  author_image: string;
  firstname_author: string;
  lastname_author: string;
  profession: string;
}

export interface ModelSolicitudesEnviadas {
  pk: string;
  fistName: string;
  lastName: string;
  headline: string;
  profession: string;
  image_perfil: string;
}

export interface ModelContactosParaConectar {
  pk: string;
  fistName: string;
  lastName: string;
  headline: string;
  profession: string;
  image_perfil: string;
}

export interface ModelContactos {
  pk: string;
  fistName: string;
  lastName: string;
  headline: string;
  profession: string;
  image_perfil: string;
  receiver: string;
  sender: string;
  id_contact?: string;
}

export interface ModelPerfilUsuario {
  pk: string;
  fistName: string;
  lastName: string;
  headline: string;
  profession: string;
  image_perfil: string;
}


export interface ModelNetworkData {

  cantidad_contactos_para_conectar: string;
  cantidad_solicitudes_enviadas: string;
  cantidad_solicitudes_recibidas: string;
  cantidad_contactos: string;
  notificaciones: string;
  message_notifications: string;


  solicitudes_recibidas: ModelSolicitudesRecibidas[];

  solicitudes_enviadas: ModelSolicitudesEnviadas[];

  contactos_para_conectar: ModelContactosParaConectar[];

  lista_contactos: ModelContactos[];

  perfil_usuario: ModelPerfilUsuario[];

  eventos: [];

}

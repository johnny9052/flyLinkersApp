
export interface ModeloFirst100 {
      pk: string;
      fistName: string;
      lastName: string;
      headline: string;
      profession: string;
      image_perfil: string;
      residence_country: string;
}

export interface ModelFirst100Data {
  [x: string]: ModeloFirst100[];

  first100: ModeloFirst100[];

}

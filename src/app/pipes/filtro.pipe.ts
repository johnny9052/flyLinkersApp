import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {

    if(texto === '') {
      return arreglo;
    }

    texto = texto.toLowerCase();

    return arreglo.filter(item => {
      let fullName = item.fistName.toLowerCase() + " " + item.lastName.toLowerCase();
      return ((fullName.includes(texto)));
    });
  }

}

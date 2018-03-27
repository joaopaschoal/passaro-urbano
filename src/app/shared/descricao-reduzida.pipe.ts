import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
  public transform(texto: string, maxCaracteres: number): string {
    if (texto.length > maxCaracteres) {
      return texto.substr(0, maxCaracteres) + '...';
    } else {
      return texto;
    }
  }
}

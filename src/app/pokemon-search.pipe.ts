import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonSearch'
})
export class PokemonSearchPipe implements PipeTransform {

  transform(value: any, term: string): any {
    if (!value || !term) return value;

    term = term.toUpperCase();

    return value.filter((item: any) => {
      let name = item.name.toUpperCase();

      if (name.includes(term)) {
        return item;
      }
    });
  }

}

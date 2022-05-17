import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  getPokemons(): Observable<Pokemon[]> {
    return of([{ id:"", name:"Bulbasaur"}, { id:"", name:"Dragonite"}, { id:"", name:"Pikachu"}])
  }
}

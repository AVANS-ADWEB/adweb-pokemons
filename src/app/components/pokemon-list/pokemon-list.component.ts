import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  term: string = "";

  pokemon?: Pokemon;
  pokemons: Pokemon[] = [];

  service: PokemonService;

  constructor(service: PokemonService, dragulaService: DragulaService) { 
    this.service = service;

    service.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
    })

    dragulaService.drag().subscribe((value) => {
      console.log("drag")
      console.log(value)
    });

    dragulaService.drop().subscribe((value) => {
      console.log("drop")
      console.log(value)
    });
  }

  ngOnInit(): void {
  }

  onSelect(pokemon: Pokemon) {
    this.pokemon = pokemon;
  }

  onDelete(pokemon: Pokemon) {
    this.service.deletePokemon(pokemon);
  }

  onSearch(term: string) {
    this.term = term;
  }
}

import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemon?: Pokemon;
  pokemons: Pokemon[] = [];

  service: PokemonService;

  constructor(service: PokemonService) { 
    this.service = service;

    service.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
    })
  }

  ngOnInit(): void {
  }

  onSelect(pokemon: Pokemon) {
    this.pokemon = pokemon;
  }

  onDelete(pokemon: Pokemon) {
    this.service.deletePokemon(pokemon);
  }
}

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
  pokemons: any[] = []

  constructor(service: PokemonService) { 
    service.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
    })
  }

  ngOnInit(): void {
  }

  onClick(pokemon: Pokemon) {
    this.pokemon = pokemon;
  }
}

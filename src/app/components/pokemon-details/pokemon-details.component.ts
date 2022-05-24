import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Move } from 'src/app/models/move.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnChanges {

  service: PokemonService;

  pokemon?: Pokemon;
  owner?: string;
  moves?: Move[];
  friends?: Pokemon[];

  @Output()
  public deleteEvent = new EventEmitter();

  @Input()
  public key: any;

  constructor(service: PokemonService) {
    this.service = service;
  }

  ngOnChanges(): void {
    this.service.getPokemon(this.key).subscribe((pokemon) => {
      this.pokemon = pokemon;
    })

    this.service.getPokemonOwner(this.key).subscribe((owner) => {
      this.owner = owner;
    })

    this.moves = undefined;

    this.service.getPokemonMoves(this.key).subscribe((moves) => {
      this.moves = moves;
    })

    this.friends = undefined;

    this.service.getPokemonFriends(this.key).subscribe((friends) => {
      this.friends = friends;
    })
  }

  onDelete() {
    this.deleteEvent.emit(this.pokemon);
    this.key = null;
  }
}

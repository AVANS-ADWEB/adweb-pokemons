import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnChanges {

  pokemon?: Observable<Pokemon>;
  owner?: Observable<string>;

  service: PokemonService;
  formBuilder: FormBuilder;

  @Output()
  public deleteEvent = new EventEmitter();

  @Input()
  public key: any;
  public pokemonForm?: FormGroup;

  constructor(service: PokemonService, formBuilder: FormBuilder) {
    this.service = service;
    this.formBuilder = formBuilder;

  }

  onDelete() {
    this.key = null;
    this.pokemon?.subscribe((pokemon) => {
      this.deleteEvent.emit(pokemon)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.key) return;

    this.pokemon = this.service.getPokemon(this.key);
    this.owner = this.service.getPokemonOwner(this.key);

    this.pokemon.subscribe((pokemon) => {
      this.pokemonForm = this.formBuilder.group(pokemon);

      this.pokemonForm.valueChanges.subscribe((pokemon) => {
        this.service.updatePokemon(pokemon);
      })
    })
  }
}

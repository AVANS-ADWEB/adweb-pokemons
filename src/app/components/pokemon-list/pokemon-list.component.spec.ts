import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

import { PokemonListComponent } from './pokemon-list.component';

let pokemonService = {
  getPokemons: () => of([]),
  deletePokemon: () => void {}
}

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonListComponent ],
      providers: [ { provide: PokemonService, useValue: pokemonService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deletePokemon', () => {
    let deletePokemon = spyOn(component.service, "deletePokemon");
    
    component.onDelete({id: "", name: ""});

    expect(deletePokemon).toHaveBeenCalled();
  });
});

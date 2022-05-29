import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonService } from './services/pokemon.service';
import { PokemonSearchPipe } from './pokemon-search.pipe';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';

import { DragulaModule, DragulaService } from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    PokemonSearchPipe,
    PokemonSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragulaModule
  ],
  providers: [ PokemonService, DragulaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

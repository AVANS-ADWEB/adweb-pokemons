import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {

  query: Subject<string> = new Subject();

  @Output()
  search = new EventEmitter();

  constructor() {
    this.query.pipe(debounceTime(500)).subscribe((query) => {
      this.search.emit(query);
    })
  }

  ngOnInit(): void {
  }

  onChange(query: string) {
    this.query.next(query);
  }

}

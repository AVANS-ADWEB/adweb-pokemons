import { PokemonSearchPipe } from './pokemon-search.pipe';

describe('PokemonSearchPipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonSearchPipe();
    expect(pipe).toBeTruthy();
  });
});

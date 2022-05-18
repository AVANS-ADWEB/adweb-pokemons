import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, Subscriber } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOwAFWtrINdCJojEqU5ZM1-r5QVN0mp6M",
  authDomain: "adweb-pokemons.firebaseapp.com",
  projectId: "adweb-pokemons",
  storageBucket: "adweb-pokemons.appspot.com",
  messagingSenderId: "413743139310",
  appId: "1:413743139310:web:356ab25e56fb14b3be66ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable()
export class PokemonService {

  constructor() { }

  getPokemons(): Observable<Pokemon[]> {
    return new Observable((subscriber: Subscriber<any>) => {
        onSnapshot(collection(db, "pokemons"), (snapshot) => {
          const items: Pokemon[] = [];

          snapshot.forEach((doc) => {
            items.push({ id: doc.id, name: doc.data()["name"], owner: doc.data()["owner"] })
          })

          subscriber.next(items);
        });
    });
  }

  getPokemon(id: string): Observable<Pokemon> {
    return new Observable((subscriber: Subscriber<any>) => {
      onSnapshot(doc(db, "pokemons", id), (doc) => {
        let data = doc.data();

        if (data) {
          subscriber.next({ id: doc.id, name: data["name"], owner: data["owner"] });
        }
      })
    });
  }

  getOwner(id: string): Observable<string> {
    return new Observable((subscriber: Subscriber<any>) => {
      onSnapshot(doc(db, "owners", id), (doc) => {
        let data = doc.data();

        if (data) {
          subscriber.next(data["name"]);
        }
      })
    });
  }

  getPokemonOwner(id: string): Observable<string> {
    return this.getPokemon(id).pipe(mergeMap((pokemon) => {
      return this.getOwner(pokemon.owner);
    }));
  }

  addPokemon(pokemon: Pokemon) {
    addDoc(collection(db, "pokemons"), { "name" : pokemon.name })
  }

  updatePokemon(pokemon: Pokemon) {
    updateDoc(doc(db, "pokemons", pokemon.id), { "name" : pokemon.name })
  }

  deletePokemon(pokemon: Pokemon) {
    deleteDoc(doc(db, "pokemons", pokemon.id));
  }
}


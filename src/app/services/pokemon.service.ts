import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection, deleteDoc, addDoc, doc } from "firebase/firestore";

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

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  getPokemons(): Observable<Pokemon[]> {
    return new Observable((subscriber: Subscriber<any>) => {
        onSnapshot(collection(db, "pokemons"), (snapshot) => {
          const items: Pokemon[] = [];

          snapshot.forEach((doc) => {
            items.push({ id: doc.id, name: doc.data()["name"] })
          })

          subscriber.next(items);
        });
    });
  }

  deletePokemon(pokemon: Pokemon) {
    deleteDoc(doc(db, "pokemons", pokemon.id));
  }

  addPokemon(pokemon: Pokemon) {
    addDoc(collection(db, "pokemons"), { "name" : pokemon.name })
  }
}


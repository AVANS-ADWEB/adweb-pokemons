import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection, deleteDoc, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
            let pokemon = new Pokemon();
            pokemon.id = doc.id;
            pokemon.name = doc.data()["name"]
            items.push(pokemon)
          })

          subscriber.next(items);
        });
    });
  }

  deletePokemon(pokemon: Pokemon) {

  }
}


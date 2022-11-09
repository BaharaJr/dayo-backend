import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { readFileSync } from 'fs';

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App;

  constructor() {
    const config = JSON.parse(readFileSync('./keys.json', 'utf-8'));
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(config),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };

  firestore = (): firebase.firestore.Firestore => {
    return this.firebaseApp.firestore();
  };
}

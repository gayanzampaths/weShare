import { Injectable } from '@angular/core';

//import firebase
import * as firebase from 'firebase';

@Injectable()
export class AuthserviceProvider {

  public data: any;
  public fireAuth: any;
  public userProfile: any;

  constructor() {
    this.fireAuth = firebase.auth();

    this.userProfile = firebase.database().ref('user');
    
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

  signupUser(account: {}){
    return this.fireAuth.createUserWithEmailAndPassword(account['email'], account['password']).then((newUser) => {
      //sign in the user
      this.fireAuth.signInWithEmailAndPassword(account['email'], account['password']).then((authenticatedUser) => {
        //successful login, create user profile
      this.userProfile.child(authenticatedUser.uid).set(
        account
      );
      });
    });

  }

}

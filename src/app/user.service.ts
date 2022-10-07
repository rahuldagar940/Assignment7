//import { Injectable } from '@angular/core';

import { Injectable, NgZone } from '@angular/core';
//import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './User';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MessageService } from './message.service';
import { TwitterAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  //user: Observable<firebase.User>;
  user: any;
  defaultProfilePic: string = "https://i.pinimg.com/564x/bc/51/24/bc51248c1856ab524fddeae7a843634a.jpg";
  //userIdToken!: string;
  constructor(public firebaseAuth: AngularFireAuth, public router: Router, private http: HttpClient, public messageService : MessageService) {
    this.user = firebaseAuth.authState;


    console.log("User id Token value at the construction of this service: ", localStorage.getItem('userIdToken'));

    this.user.subscribe(
      (userInfo: any) => {
        console.log("User Info is available :", userInfo.getIdToken());
        this.saveIdToken(userInfo);
      }
    );
  }

  async canActivate(): Promise<boolean> {
    if (await this.firebaseAuth.currentUser != null) {
      return true;
    }
    console.log('redireting to Login');
    this.router.navigate(['login']);
    return false;
  }

  // storeIdToken(idToken: Promise<string>) {
  //   idToken.then(
  //     idTokenValue => {
  //       localStorage.setItem('userIdToken', idTokenValue);
  //       console.log("Id Token Value: ", localStorage.getItem('userIdToken'));
  //     }
  //   )
  // }

  saveIdToken(firebaseUser: any) {
    firebaseUser.getIdToken().then(
      (idTokenValue: string) => {
        console.log('saveidtoken method  test');
        localStorage.setItem('userIdToken', idTokenValue);
        console.log('saveidtoken method  test');
        console.log("Id Token Value: ", localStorage.getItem('userIdToken'));
        console.log('idtoken printed');
      }
    )
  }

  signup(email: string, password: string, name: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Success Signup', value);
        this.registerUser(email, name);
        console.log("signup ", email, name);

      });
  }
  registerUser(email: string, name: string) {
    var user: User = {
      profilePicURL: this.defaultProfilePic,
      email: email,
      id: "",
      name: name,
    }

    this.http.post(environment.API_URL + "users", user /*{headers}*/).subscribe(response => {
      console.log('Success registration');
      console.log("register user", email, name);
      this.router.navigate(['albums/recent']);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice it worked');
        this.saveIdToken(value);
        this.router.navigate(['albums/recent']);
      })
      .catch(err => {
        console.log('wrong', err.message);
        this.messageService.newMessage(err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut()
      .then((value => {
        console.log('OK, Logged out', value)
      }));
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getCurrentUserProfile(){
    var headers : any = this.getHeaders();
    console.log('calling get all albums method and header value: ', headers);
    return this.http.get(environment.API_URL+"users", /*{headers}*/);
  }
  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    return headers;
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

import * as firebase from 'firebase';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AngularFireDatabase]
})
export class ProfilePage {

  public user;
  public name;
  public country;
  public mobile;
  public email;

  userData: FirebaseListObservable<any> ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {

    this.user = this.navParams.get('user');
    if(!this.user){
      this. user = firebase.auth().currentUser.uid;
    }
    console.log(this.user);

    this.userData = this.af.list('/user/'+this.user);

    this.userData.subscribe(user => {
      console.log(user);
      for(let i=0; i<user.length;i++){
        if(user[i].$key=="name"){
          this.name = user[i].$value
        }
        if(user[i].$key=="country"){
          this.country = user[i].$value
        }
        if(user[i].$key=="mobile"){
          this.mobile = user[i].$value
        }
        if(user[i].$key=="email"){
          this.email = user[i].$value
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }


  signOut(): Promise<void> {
    return firebase.auth().signOut();
  }



}

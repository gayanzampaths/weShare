import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

//import services
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

import * as firebase from 'firebase';

//import pages

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string;
  public password: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public authservice: AuthserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitlogin(){
    var that = this;
    var loader = this.loadingCtrl.create({
      content: "please wait"
    });
    loader.present();

    this.authservice.loginUser(this.email, this.password).then(authData => {
      //successful
      loader.dismiss();
      that.navCtrl.setRoot(HomePage);
    }, error => {
      loader.dismiss();
      //unable to login
      let toast = this.toastCtrl.create({
        message: error,
        duration: 4000,
        position: 'top'
      });
      toast.present();
    })
  }

  redirectregister(){
    this.navCtrl.push(RegisterPage);
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}

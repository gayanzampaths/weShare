import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

//import services
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

//import pages

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public name: string;
  public email: string;
  public password: string;
  public country: string;
  public mobile: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public authservice: AuthserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  submitregister(){
    var account = {
      name : this.name || '',
      email : this.email,
      password : this.password,
      country : this.country || '',
      mobile : this.mobile || ''
    };
    var that = this;

    var loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    this.authservice.signupUser(account).then(authData => {
  		//successful
  		loader.dismiss();
  		that.navCtrl.push(HomePage);

  	}, error => {
        loader.dismiss();
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'top'
        });
        toast.present();

        that.password = ""//empty the password field
      });
    }

}

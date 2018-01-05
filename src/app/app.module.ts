import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AddtoolPage } from '../pages/addtool/addtool';

//import services
import { AuthserviceProvider } from '../providers/authservice/authservice';

//import { AngularFireModule } from 'angularfire2';
//initalize firebase and angularfire2
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LocationserviceProvider } from '../providers/locationservice/locationservice';
import { ProfilePage } from '../pages/profile/profile';
import { TooldataPage } from '../pages/tooldata/tooldata';

import { RatingComponent } from '../components/rating/rating';

export const config = {
  apiKey: "AIzaSyBkFQyGmwlbQqlyK3wnzSNRmFC8BxjLBYY",
  authDomain: "weshare-4e97e.firebaseapp.com",
  databaseURL: "https://weshare-4e97e.firebaseio.com",
  projectId: "weshare-4e97e",
  storageBucket: "weshare-4e97e.appspot.com",
  messagingSenderId: "184656671784"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    AddtoolPage,
    ProfilePage,
    TooldataPage,
    RatingComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    AddtoolPage,
    ProfilePage,
    TooldataPage,
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthserviceProvider,
    LocationserviceProvider,
  ]
})
export class AppModule {}

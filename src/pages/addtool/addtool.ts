import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera' ;

//import firebase
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-addtool',
  templateUrl: 'addtool.html',
  providers: [AngularFireDatabase],
})
export class AddtoolPage {

  public toolName: string;
  public category: string;
  public price: string;
  public depPrice: string;

  tools: FirebaseListObservable<any>;

  public photo: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              af: AngularFireDatabase,
              public camera: Camera,) {

                this.tools = af.list('/tools');

                console.log(this.navParams.get('lat'));
                console.log(this.navParams.get('lng'));

                //console.log(this.navParams.get('photo'))

                console.log(firebase.auth().currentUser.uid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtoolPage');
  }

  takePic(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photo.push(this.base64Image);
    }, (err) => {
     // Handle error
    });
  }

  submitTool(){
    var toolData = {
      toolName: this.toolName,
      category: this.category,
      price: this.category,
      depPrice: this.depPrice,
      lat: this.navParams.get('lat'),
      lng: this.navParams.get('lng'),
      userID: firebase.auth().currentUser.uid
    };
    this.tools.push(toolData);
    this.navCtrl.push(HomePage);

  }

}

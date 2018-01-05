import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import { TooldataPage } from '../tooldata/tooldata';
import { AddtoolPage } from '../addtool/addtool';
//import { Camera, CameraOptions } from '@ionic-native/camera' ;
import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Geolocation, AngularFireDatabase]
})
export class HomePage {

  public isAddReq : boolean;

  @ViewChild('map') mapElement;
  map: any;
  positon : any;
  currentloc: any;
  markers = [];
  allTools = [];
  //currentloc: any;

  // public photo: any;
  // public base64Image: string;

  toollist: FirebaseListObservable<any> ;

  public toolsRef:firebase.database.Reference;
  toolssearch: FirebaseListObservable<any>;
  public toolsList:Array<any>;
  public loadedToolsList:Array<any>;

  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              af: AngularFireDatabase,
              public alertCtrl: AlertController) {

    var that = this;
    firebase.auth().onAuthStateChanged(function(user){
      if(!user){
        that.navCtrl.setRoot(LoginPage);
      }
    });

    this.toollist = af.list('/tools');

    this.toolsRef = firebase.database().ref('/tools');
    this.toolssearch = af.list('/tools');

    this.toolsRef.on('value', toolsList => {
      let toolss = [];
      toolsList.forEach(tool => {
        toolss.push(tool.val());
        return false;
      });

      this.toolsList = toolss;
      this.loadedToolsList = toolss;
    });

  }

  ionViewDidLoad(){
    this.loadMap();
    //this.showAllToolsOnMap();
    //this.setMapOnAll(true);
  }

  confirmAddTool(){
    this.isAddReq = true;
    console.log("confirmed!");
  }

  cancelAddtool(){
    this.isAddReq = false;
  }

  addTool(){

    let prompt = this.alertCtrl.create({
      message: 'Do You want to Add a tool? Take a photo of your tool',
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            let datas= {
              lat: this.map.getCenter().lat(),
              lng: this.map.getCenter().lng(),
            }
            this.navCtrl.push(AddtoolPage, datas);
          }
        }
      ]
    });
    prompt.present();
    //this.navCtrl.push(AddtoolPage, data);
  }

  initializeItems(): void {
    this.toolsList = this.loadedToolsList;
  }

  getItems(searchbar) {
    //clear map
    this.setMapOnAll(false);

    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.toolsList = this.toolsList.filter((v) => {
      if(v.toolName && q) {
        if (v.toolName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.toolsList.length);
    //this.markers.setVisible(false);
    this.showSearchTools();

  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles:[
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#181818"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1b1b1b"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2c2c2c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8a8a8a"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#373737"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3c3c3c"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3d3d3d"
              }
            ]
          }
        ],
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //console.log(latLng);
      this.addMarker(latLng);
      this.currentloc.setVisible(true);
      //this.addMarker(latLng);
      //this.showMarker();
    });
    
  }

  addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.DROP,
        icon: { url : 'https://firebasestorage.googleapis.com/v0/b/weshare-4e97e.appspot.com/o/red-glossy-dot-hi.png?alt=media&token=f27faca7-4fea-43c6-9358-431856918f14',
        scaledSize: new google.maps.Size(10, 10), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) },
        visible: false
    });
    this.currentloc = marker;
  }

  setMapOnAll(arg){
    //this.currentloc.setVisible(true);
      for(let i=0;i<this.allTools.length;i++){
        this.allTools[i].setVisible(arg);
      }
      //this.allTools = [];
  }

  showMarker(){
    this.setMapOnAll(this.map);
  }

  showSearchTools(){
    this.allTools = [];
    console.log(this.toolsList);
    for(let i=0;i<this.toolsList.length;i++){
      var LatLngs = {lat: this.toolsList[i].lat, lng: this.toolsList[i].lng};
        let mark = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.bounce,
          icon: { url : 'assets/images/logo/login.png',
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) },
          position: LatLngs,
          visible: false
        });
        //mark.setMap(null);
        //mark.setVisible(true);
        google.maps.event.trigger(mark, 'click');
        var that= this;
        mark.addListener('click', function() {
          let prom = that.alertCtrl.create({
            message: that.toolsList[i].toolName,
            buttons: [
              {
                text: 'Go To Tool Details',
                handler: data => {
                  let toolData = {
                    id : that.toolsList[i].$key
                  };
                  that.navCtrl.push(TooldataPage, toolData);
                }
              }
            ]
          });
          prom.present();
        });
        this.allTools.push(mark);
    }
    this.setMapOnAll(true);
  }

  async showAllToolsOnMap(){
    this.toollist.subscribe(tool => {
      for(let i=0; i<tool.length; i++){
        var LatLngs = {lat: tool[i].lat, lng: tool[i].lng};
        let mark = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          icon: { url : 'assets/images/logo/login.png',
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) },
          position: LatLngs,
          visible: false
        });
        //mark.setMap(null);
        //mark.setVisible(true);
        google.maps.event.trigger(mark, 'click');
        var that= this;
        mark.addListener('click', function() {
          let prom = that.alertCtrl.create({
            message: tool[i].toolName,
            buttons: [
              {
                text: 'Go To Tool Details',
                handler: data => {
                  let toolID = {
                    id : tool[i].$key
                  };
                  that.navCtrl.push(TooldataPage, toolID);
                }
              }
            ]
          });
          prom.present();
        });
        this.allTools.push(mark);
      }
      this.setMapOnAll(true);
      //this.allTools[0].setVisible(true);
      //this.showMarker();
    });
    //this.showMarker(this.allTools);
    console.log("test 2");
    //console.log(this.allTools);
    //this.showMarker();

  }

  clearMarker(){
    //this.setMapOnAll(null);
    console.log("step 3");
  }

  deleteMarkers(){
    this.clearMarker();
    this.allTools = [];
    console.log("setp 2");
  }

}
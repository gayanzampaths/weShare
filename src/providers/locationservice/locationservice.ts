import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationserviceProvider {

  constructor(public geolocation: Geolocation) {
    
  }

}

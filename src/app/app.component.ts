// import { Component } from '@angular/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader, LatLngBounds } from '@agm/core';
import {} from '@types/googlemaps'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
title:string="map"
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public formatted_address: string;
 // public markers:marker[];
  productData: Product;
  ingredients:Ingredient[];
  storeMap:any;
  openedWindow : number = 0; // alternative: array of numbers
  trailList: Trail[] = [];

   @ViewChild("search")
  public searchElementRef: ElementRef;

  

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpClient
  ) {
    this.getJSON().subscribe(data => {
        console.log(data);
        this.productData = data;
        this.ingredients = data["ingredients"];

        for(let ingredient of this.ingredients){
          for(let trail of ingredient.trails){
            trail["label"] = ingredient.label;
            trail["imgPath"] = ingredient.imgPath;
            this.trailList.push(trail);
          }
        }
        //this.loadMap();
    });
  }
  public getJSON(): Observable<any> {
      return this.http.get("./assets/data.json")
  }
  loadMap(){
    //set google maps defaults
   // this.zoom = 6;
    //  this.latitude = 28.394857;
    //  this.longitude = 84.124008;
    //this.markers =[{"lat":39.8282, "lng": -98.5795}]

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      /*let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          //this.latitude = place.geometry.location.lat();
          //this.longitude = place.geometry.location.lng();
          this.formatted_address = place.formatted_address;
          //this.zoom = 14;
          console.log(this.formatted_address);
          console.log(this.latitude);
          console.log(this.longitude);
          console.log(this.zoom);          
        });
      });*/
    });
  }

  ngOnInit() {
    
  }

  openWindow(id) {
    this.openedWindow = id; // alternative: push to array of numbers
  }

  isInfoWindowOpen(id) {
      return this.openedWindow == id; // alternative: check if id is in array
  }
  mapClicked($event: MouseEvent){
    this.openWindow(-1);
  }
  public storeMapReady(map){
    this.storeMap = map;
    this.storeMap.fitBounds(this.findStoresBounds());
  }

  public findStoresBounds(){
      let bounds:any = new google.maps.LatLngBounds();      
      for(let marker of this.trailList){
        bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
      }      
      return bounds;
  }
  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }

  markerDragEnd(m: marker, $event: MouseEvent) {
    var s="s";
    console.log('dragEnd', m, $event);
  }

  sideBarLinkClicked(marker){
    var s="sd";
    this.latitude = marker.lat;
    this.longitude = marker.lng;
    this.openWindow(marker.id)
  }

  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       //this.zoom = 14;
  //     });
  //   }
  // }

   _opened: boolean = true;
 
   _toggleSidebar() {
    this._opened = !this._opened;
  }
}

interface marker {
  id:number,
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  name:string;
}

interface Product{
  id: string,
	name: string,
	imgPath: string,
  ingredients:Ingredient[];
}
interface Ingredient {
  id: string,
	name: string,
	imgPath: string,  
	label: string,
	trails:Trail[];
}
interface Trail {
  id: string,
	name: string,
  place: string,
  lat:number
  lng:number
  desc:string,
  draggable:boolean
}

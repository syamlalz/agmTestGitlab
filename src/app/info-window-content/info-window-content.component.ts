import { Component, OnInit, Input  } from '@angular/core';
import { Marker } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-info-window-content',
  templateUrl: './info-window-content.component.html',
  styleUrls: ['./info-window-content.component.css']
})
export class InfoWindowContentComponent implements OnInit {

  @Input() childData:any;


  constructor() { }

  ngOnInit() {
  }

}

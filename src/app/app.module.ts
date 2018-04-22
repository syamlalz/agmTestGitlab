import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { InfoWindowContentComponent } from './info-window-content/info-window-content.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';


@NgModule({
  declarations: [
    AppComponent,
    InfoWindowContentComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbmLhRCZINcycWSBuP0dhz7MiGF-ULmFc',
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

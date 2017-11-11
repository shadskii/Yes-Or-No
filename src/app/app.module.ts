import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardstackComponent } from './cardstack/cardstack.component';
import { SwingModule } from 'angular2-swing';
import { CardService } from './card.service';
import { MatCardModule, MatToolbarModule, MatGridListModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    CardstackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SwingModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

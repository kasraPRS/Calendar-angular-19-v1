import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration, withEventReplay} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {DEFAULT_DIALOG_CONFIG} from '@angular/cdk/dialog';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    MatListModule,
    MatButtonModule,
    DragDropModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    {provide: DEFAULT_DIALOG_CONFIG, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

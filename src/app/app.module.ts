import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignalComponentComponent } from './signal-component/signal-component.component';


@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, SignalComponentComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

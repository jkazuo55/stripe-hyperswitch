import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    NgxStripeModule.forRoot('pk_test_51Ohe3QHf3kLLsVtOEC1FI17ks58lfv082cPUPpWrSUaeHnsA1KLrjgU6p3LgCMNlerji5RrcFZDXMJgZFYgGfPy7002MyuliJZ'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
//import { appuserReducer } from './store/store.reducer';
import { ViewsModule } from './views/views.module';
const redusers = {
  //getAppUser: appuserReducer,
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    // StoreModule.forRoot({
    //   ...redusers,
    // }),
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ViewsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}

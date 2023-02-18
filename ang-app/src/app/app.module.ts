import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule, Store } from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MyInterceptor } from './interceptors/Http.interceptor'
import { appuserReducer } from './store/store.reducer'
import { MatGridListModule } from '@angular/material/grid-list'
//import { appuserReducer } from './store/store.reducer';
import { ViewsModule } from './views/views.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderComponent } from './views/header/header.component'
const redusers = {
    getAppUser: appuserReducer,
}
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({
            ...redusers,
        }),
        BrowserModule,
        AppRoutingModule,

        ViewsModule,
        FormsModule,
        MatGridListModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        FormBuilder,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

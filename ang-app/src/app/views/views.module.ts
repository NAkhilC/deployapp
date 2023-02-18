import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { FormBuilderService } from '../services/form-builder/form-builder.service'
import { MatSelectModule } from '@angular/material/select'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { MatGridListModule } from '@angular/material/grid-list'
import { SortComponent } from './sort/sort.component'
import { AboutComponent } from './about/about.component'
import { ContactComponent } from './contact/contact.component'
import { ViewItemComponent } from './view-item/view-item.component'
import { HeaderComponent } from './header/header.component'

@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        SortComponent,
        AboutComponent,
        ContactComponent,
        ViewItemComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatGridListModule,
        MatIconModule,
        MatSelectModule,
    ],
    exports: [HomeComponent, LoginComponent, AboutComponent, ContactComponent, ViewItemComponent, HeaderComponent],
    providers: [FormBuilder],
})
export class ViewsModule {}

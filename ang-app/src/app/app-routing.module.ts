import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './services/auth/auth.guard'
import { AboutComponent } from './views/about/about.component'
import { ContactComponent } from './views/contact/contact.component'
import { HomeComponent } from './views/home/home.component'
import { LoginComponent } from './views/login/login.component'
import { ViewItemComponent } from './views/view-item/view-item.component'

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'view/:id',
        component: ViewItemComponent,
        canActivate: [AuthGuard],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

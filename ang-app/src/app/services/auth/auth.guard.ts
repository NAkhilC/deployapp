import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { getAppUser } from 'src/app/store/store.Selector'

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    authFlag: boolean = false
    constructor(private store: Store, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.store.select(getAppUser).subscribe((user) => {
            if (user.getAppUser?.appUser?.userName) {
                console.log(user)
                this.authFlag = true
            }
        })
        if (this.authFlag) {
            console.log(this.authFlag)
            return true
        }
        this.router.navigate(['/'])
        return false
    }
}

import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { BehaviorSubject } from 'rxjs'
import { ReferenceService } from 'src/app/services/http/reference.service'
import { AppUser } from 'src/app/store/AppUser.model'
import { getAppUser } from 'src/app/store/store.Selector'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    loggedIn!: boolean
    public user: any = new BehaviorSubject('Not logged in')
    user$ = this.user.asObservable()

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.select(getAppUser).subscribe((user) => {
            this.user.next(user.getAppUser?.appUser?.userName)
        })
    }
}

import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Route, Router } from '@angular/router'
import { BehaviorSubject, Subject } from 'rxjs'
import { Store } from '@ngrx/store'
import { STRING_TYPE } from '@angular/compiler'
import { UpdateAppUser } from 'src/app/store/store.action'
import { getAppUser } from 'src/app/store/store.Selector'
import { environment } from 'src/environments/environment'
//import { UpdateAppUser } from 'src/app/store/store.action';

@Injectable({
    providedIn: 'root',
})
export class ReferenceService {
    constructor(private httpClient: HttpClient, private store: Store, private router: Router) {}

    loggedIn$ = new BehaviorSubject<boolean>(false)
    private user = new Subject()
    token!: string
    baseUrl = environment.baseUrl

    getService() {
        // const requestOptions = {
        //     headers: new HttpHeaders({
        //         Authorization: '',
        //     }),
        //     withCredentials: true,
        // }
        // this.httpClient.get<string>('http://localhost:3000/', requestOptions).subscribe((val: any) => {
        //     if (val.user) {
        //         this.store.dispatch(
        //             UpdateAppUser({
        //                 appUser: { status: val.status, userName: val.user },
        //             })
        //         )
        //         this.router.navigate(['/home'])
        //     }
        // })
    }

    sendToken() {
        if (this.token) {
            return this.token
        }
        return ''
    }

    test() {
        const requestOptions = {}
        this.httpClient.get(`${this.baseUrl}/test`, {}).subscribe((val: any) => {
            if (val.user) {
                this.store.dispatch(
                    UpdateAppUser({
                        appUser: { status: val.status, userName: val.user },
                    })
                )
                this.router.navigate(['/home'])
            }
        })
    }

    loginService(values: any) {
        this.httpClient
            .post(
                `${this.baseUrl}/login`,
                { email: values.userid, password: values.password },
                {
                    withCredentials: true, // <=========== important!
                }
            )
            .subscribe((val: any) => {
                if (val.status === 200) {
                    this.store.dispatch(
                        UpdateAppUser({
                            appUser: { status: val.status, userName: val.user },
                        })
                    )
                    this.token = val.token
                    this.router.navigate(['/home'])
                    return val
                }
            })
    }
}

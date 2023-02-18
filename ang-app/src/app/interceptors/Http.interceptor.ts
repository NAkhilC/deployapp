import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { ReferenceService } from '../services/http/reference.service'

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(private ref: ReferenceService) {}
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders().set('Authorization', this.ref.sendToken())
        let AuthRequest = httpRequest.clone({ headers: headers })
        AuthRequest = AuthRequest.clone({
            withCredentials: true,
        })
        return next.handle(AuthRequest).pipe(
            catchError((err) => {
                if (err.status === 400) {
                    console.log('your token has expired')
                } else if (err.status === 500) {
                    console.log('internal server error')
                } else {
                    console.log('error occured please try again later')
                }
                return throwError(() => '')
            })
        )
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { STRING_TYPE } from '@angular/compiler';
//import { UpdateAppUser } from 'src/app/store/store.action';

@Injectable({
  providedIn: 'root',
})
export class ReferenceService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  loggedIn$ = new BehaviorSubject<boolean>(false);
  private user = new Subject();

  getService() {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: '',
      }),
      withCredentials: true,
    };
    this.httpClient
      .get<string>('http://localhost:3000/', requestOptions)
      .subscribe((val) => {
        console.log(val);
      });
  }

  test() {
    console
      .log
      // this.store.dispatch(
      //   UpdateAppUser({ appUser: { status: true, userName: 'akhil' } })
      // )
      ();
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: '',
      }),
      withCredentials: true,
    };
    this.httpClient
      .get('http://localhost:3000/test', {
        withCredentials: true, // <=========== important!
      })
      .subscribe((val) => {
        console.log(val);
      });
  }

  loginService(values: any) {
    this.httpClient
      .post(
        'http://localhost:3000/login',
        { email: values.userid, password: values.password },
        {
          withCredentials: true, // <=========== important!
        }
      )
      .subscribe((val: any) => {
        if (val.status === 200) {
          //UpdateAppUser(val);
          return val;
        }
      });
  }
}

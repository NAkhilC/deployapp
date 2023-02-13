import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RefHttpService {
  constructor(private httpClient: HttpClient) {}
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
        { withCredentials: true }
      )
      .subscribe((val: any) => {
        if (val.status === 200) {
          console.log(val);
          return val;
        }
      });
  }
}

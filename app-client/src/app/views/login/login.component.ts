import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilderService } from 'src/app/services/form-builder/form-builder.service';
import { RefHttpService } from 'src/app/services/ref-service/ref-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(
    private formBuilder: FormBuilderService,
    private ref: RefHttpService
  ) {
    //ref.getService();

    let a = this.formBuilder.initLoginForm();
    this.loginForm = a;
  }
  ngOnInit(): void {}
  submit() {
    this.ref.loginService(this.loginForm.value);
  }
  another() {
    this.ref.test();
  }
}

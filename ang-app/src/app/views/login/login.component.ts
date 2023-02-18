import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { FormBuilderService } from 'src/app/services/form-builder/form-builder.service'
import { ReferenceService } from 'src/app/services/http/reference.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup
    constructor(private router: Router, private formBuilder: FormBuilderService, private ref: ReferenceService) {
        ref.getService()

        let a = this.formBuilder.initLoginForm()
        this.loginForm = a
    }
    ngOnInit(): void {
        this.ref.test()
    }
    submit() {
        this.ref.loginService(this.loginForm.value)
    }
    another() {
        this.ref.test()
    }
}

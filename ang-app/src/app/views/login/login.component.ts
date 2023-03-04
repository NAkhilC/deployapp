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
    status: boolean = false
    userExist: boolean = false
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
    test() {
        this.ref.test()
    }
    signup() {
        this.ref.signup(this.loginForm.value).subscribe((val: any) => {
            if (val.status === 200) {
                this.status = true
            } else {
                this.userExist = true
            }
        })
    }
}

import { Component, OnInit } from '@angular/core'
import { data } from 'src/app/static/data'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor() {}
    data: any = data
    ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core'
import { ReferenceService } from 'src/app/services/http/reference.service'
import { data } from 'src/app/static/data'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(private ref: ReferenceService) {}
    data: any = []
    ngOnInit(): void {
        this.data = this.ref.getData()
    }
}

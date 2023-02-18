import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { data } from 'src/app/static/data'

@Component({
    selector: 'app-view-item',
    templateUrl: './view-item.component.html',
    styleUrls: ['./view-item.component.css'],
})
export class ViewItemComponent {
    constructor(private route: ActivatedRoute) {}
    house: any

    ngOnInit() {
        this.house = data.find((each: any) => each.id === this.route.snapshot.params['id'])
    }
}

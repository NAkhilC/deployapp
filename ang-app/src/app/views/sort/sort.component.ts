import { Component } from '@angular/core'

@Component({
    selector: 'app-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.css'],
})
export class SortComponent {
    values: any = [
        { value: '0' },
        { value: '25000' },
        { value: '50000' },
        { value: '75000' },
        { value: '100000' },
        { value: '200000' },
        { value: '300000' },
        { value: '400000' },
        { value: '500000', extra: '+' },
    ]
    bedsAndBath: any = [
        { value: '1' },
        { value: '2' },
        { value: '3' },
        { value: '4' },
        { value: '5' },
        { value: '6' },
        { value: '7', extra: '+' },
    ]
    sortBy: any = [{ value: 'Newest' }, { value: 'Low to High' }, { value: 'High to Low' }]
}

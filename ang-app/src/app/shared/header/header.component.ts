import { Component, OnInit } from '@angular/core';
import { ReferenceService } from 'src/app/services/http/reference.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn!: boolean;
  user!: string;

  constructor(private ref: ReferenceService) {}

  ngOnInit(): void {
    this.ref.loggedIn$.subscribe((val) => {
      console.log(val);
      this.loggedIn = val;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  index: number = 1;
  type: string;

  // @select(['UserReducer', 'type'])
  // user$: Observable<any>; // gets User State of the app

  //constructor(public userDetails: UserDetailsService) {}

  //constructor() {}

  ngOnInit() {
    //this.type = this.userDetails.userType();

    // this.user$.subscribe(x => {
    //   if (x !== 'signedout' && x !== undefined) {
    //     this.type = (x === 'admin@gmail.com') ? 'isAdmin' : 'isUser';
    //   }
    // });
  }

}

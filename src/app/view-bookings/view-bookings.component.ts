import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MyActions } from '../store/actions';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { UserDetailsService } from '../services/user-details.service';
import { Talk2DBService } from '../services/talk2-db.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  key;
  usertype: string;

  //object that holds the key values for a booking
  bookings: [{
    id: string,
    user: string,
    date: string,
    start: number,
    end: string,
    duration: number,
    key: string}];

constructor(
        public dialog: MdDialog,
        public userDetail: UserDetailsService,
        public getBookings: Talk2DBService
      ) {}

ngOnInit() {
    this.key = this.userDetail.user();
    //this.usertype = this.userDetail.userType(); // isAdmin

    //if (this.usertype === 'isAdmin') {
      //get the bookings for the current user
      this.bookings = this.getBookings.viewAdminBookings();
    //}
    //else if (this.usertype !== 'isAdmin') {
      //this.bookings = this.getBookings.viewUserBookings(this.key);
    //}
 }

  cancelBooking(currentObject, index) { // db key is received as 'key'
    this.getBookings.deleteBooking(currentObject); // used a method form talk2db service
    this.bookings.splice(index , 1); // removed from the array

    // dialog box used as alert msg
    const data = 'Success! You cancelled the booking.';
    this.dialog.open(AlertBoxComponent, {data});
  }

  printReceipt() {
    // dialog box used as alert msg
    const data = 'Success! Your receipt is printed.';
    this.dialog.open(AlertBoxComponent, {data});
  }
}

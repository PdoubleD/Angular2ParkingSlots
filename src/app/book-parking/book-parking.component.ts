import { Component } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { Talk2DBService } from '../services/talk2-db.service';
import { UserDetailsService } from '../services/user-details.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent {

  bookedSlots: number[] = [-1];
  default: number[] = [-1];
  bookedSlotId: number;
  show: boolean = false;
  errorFlag: boolean = false;
  pickDate;
  startTime;
  timeDuration;

  //set up the parking slots
  slots  = [
    { id: 0, isBooked: false, color: 'primary' },
    { id: 1, isBooked: false, color: 'primary' },
    { id: 2, isBooked: false, color: 'primary' },
    { id: 3, isBooked: false, color: 'primary' }
  ];

startTimeArr: string[] = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM'];
bookingDuration: string[] = ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours'];

  constructor(
    private angularFire: AngularFireDatabase,
    public dialog: MdDialog,
    public getBookings: Talk2DBService,
    public user: UserDetailsService
    ) {}

  isPastDate(selectedDate) {
      if (selectedDate < this.getBookings.currentDate) {
        // dialog box used as alert msg
        let data = "Error: Kindly select a future date!";
        this.dialog.open(AlertBoxComponent, {data});
      }
  }

  validateSlots(formVal) {
    if ( // form is empty
        (this.pickDate === undefined || this.pickDate === null)
        &&
        (this.startTime === undefined || this.startTime === null)
        &&
        (this.timeDuration === undefined || this.timeDuration === null)
      ) {
      // dialog box used as alert msg
      let data = 'Kindly fill the Form';
      this.dialog.open(AlertBoxComponent, {data});
    }
    else {
      this.show = true;
      this.bookedSlots = [-1];
      this.resetSlots();

        for (let i = 0; i < this.getBookings.bookedParkings.length; i++) {
          if (this.pickDate === this.getBookings.bookedParkings[i].date) { // DATE MATCHED
            if (parseInt(this.startTime) === parseInt(this.getBookings.bookedParkings[i].start)) { // same start time
              this.pushToBookedSlots(i);
            }
            else if (parseInt(this.startTime) > parseInt(this.getBookings.bookedParkings[i].start)) { // form start time is after booked start time
                    if (parseInt(this.startTime) < parseInt(this.getBookings.bookedParkings[i].end)) { // form start time is before booked end time
                          this.pushToBookedSlots(i);
                    }
                    else if (((parseInt(this.startTime) + parseInt(this.timeDuration)) > parseInt(this.getBookings.bookedParkings[i].start)) // form duration is > booked start time
                            &&                                                                                                   // and
                            ((parseInt(this.startTime) + parseInt(this.timeDuration)) < parseInt(this.getBookings.bookedParkings[i].end))) {   // is < booked end time
                                  this.pushToBookedSlots(i);
                              }
            }
            else if (parseInt(this.startTime) < parseInt(this.getBookings.bookedParkings[i].start)) { // start time is prior to booked start time
                    if (((parseInt(this.startTime) + parseInt(this.timeDuration)) > parseInt(this.getBookings.bookedParkings[i].start))) { // form duration > booked start time
                        this.pushToBookedSlots(i);
                    }
            }
          }
        }
          for (let j = 1; j < this.bookedSlots.length; j++) { // slots booked
            this.slots[this.bookedSlots[j]].isBooked = true;
            this.slots[this.bookedSlots[j]].color = 'accent';
          }
    }
  }

  BookParkings(formVal, form) {
      for (let j = 1; j < this.bookedSlots.length; j++) {
        if (this.bookedSlotId === this.bookedSlots[j]) {
          this.errorFlag = true;
        }
      }
      if (this.errorFlag) {
        // dialog box used as alert msg
        const data = 'Error: Slot is already booked!';
        this.dialog.open(AlertBoxComponent, {data});
      }
      else {
        formVal.slotId = this.bookedSlotId; // inserts slotid to object
        this.slots[this.bookedSlotId].isBooked = true;
        this.angularFire.list('/bookings/' + "User") // creates a new node for each user
        .push(formVal); // pushes formVal on new node each time

        // dialog box used as alert msg
        let data = 'Parking Slot Booked!';
        this.dialog.open(AlertBoxComponent, {data});

        this.show = false;
        form.reset(); // form emptied
        this.resetSlots();

      }
    this.errorFlag = false;
  }

  slotBooked(slotId) {
    this.bookedSlotId = slotId.id;
  }

  resetForm(form) { // empties the form
    this.show = false; // slots hidden
    form.reset(); // form emptied
    this.resetSlots();
  }

  resetSlots() { // reset slots to available
    for (let i = 0; i < this.slots.length; i++) {
      this.slots[i].color = 'primary';
      this.slots[i].isBooked = false;
    }
  }

  pushToBookedSlots(index) { // throw error if getBookings.bookedParkings' conditions are met
    this.bookedSlots.push(parseInt(this.getBookings.bookedParkings[index].id));
    this.default.push(parseInt(this.getBookings.bookedParkings[index].id));
  }
}
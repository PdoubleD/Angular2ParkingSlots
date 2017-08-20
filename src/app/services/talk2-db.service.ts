import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog } from '@angular/material';
import { AlertBoxComponent } from '../alert-box/alert-box.component';

@Injectable()
export class Talk2DBService {

  currentDate;
  key;
  replyKey: string;
  temp;

  item: FirebaseListObservable<any> ;
  feedback: FirebaseListObservable<any> ;
  userName: FirebaseListObservable<any>;

  bookings: [{
    id: string,
    user: string,
    date: string,
    start: number,
    end: string,
    duration: number,
    key: string
  }] = [{
    id: 'set',
    user: 'set',
    date: 'set',
    start: 0,
    end: '0',
    duration: 0,
    key: 'set'
  }];

  bookedParkings: [{
    id: string,
    user: string,
    date: string,
    start: string,
    end: string,
    duration: number
  }] = [{
    id: 'set',
    user: 'set',
    date: 'set',
    start: '0',
    end: '0',
    duration: 0
  }];

 feedbacks: [{
    uname: string,
    msg: string,
    reply: string,
    key: string
  }] = [{uname: 'Test1', msg: 'first feedback', reply: 'nill', key: '0'}];

  constructor(
    private angularFire: AngularFireDatabase,
    public dialog: MdDialog,
  ) {
    this.currentDate = new Date().toISOString().slice(0, 10); // 2017-01-30

    //get any current bookings and push the values into an array 'temp' 
      this.angularFire.list('/bookings')
      .subscribe( (x) => {
        // console.log('subscribe');
        const temp = [];
              for (let i = 0; i < x.length; i++) {
                // console.log('outerloop: ', x[i])
                for (const k in x[i]) {
                    // console.log('innerloop: ', k);
                    if (k === '$key') {
                      continue;
                    }
                    if (k === '$exists') {
                      continue;
                    }
                    if (typeof x[i][k] !== 'function') {
                      // console.log("pushed in temp? ", x[i][k]);
                        temp.push({
                          id: x[i][k].slotId,
                          user: x[i].$key,
                          date: x[i][k].date,
                          start: x[i][k].start,
                          end: parseInt(x[i][k].start) + parseInt(x[i][k].duration) + 'AM',
                          duration: x[i][k].duration,
                        });
                    }
                  }
              }
        //use <any> to avoid compilation errors and use minimal typechecking as we have set default values for bookedParkings anyway
        this.bookedParkings = <any>temp;
        console.log('bookedParkings: ', this.bookedParkings);
    });
  }

  //not in use currently
  getFeedbacks() {
            this.feedback = this.angularFire.list('/feedbacks');
            this.feedback.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.feedbacks[i] = {
                      uname: x[i].uname,
                      msg: x[i].msg,
                      reply: x[i].reply || 'No Responce Yet',
                      key: x[i].$key
                  };
              }
            });
            return this.feedbacks;
  }
  //not in use currently
   ShowKey(key) {
    this.replyKey = key;
    this.feedback = this.angularFire.list('/feedbacks/' + this.replyKey);
            this.feedback.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.temp = {
                      uname: x[i].uname,
                      msg: x[i].msg,
                      reply: x[i].reply || 'No Response Yet',
                      key: x[i].$key
                  };
              }
            });
  }
  //not in use currently
  SendFeedback(formValue, name) {
    if (formValue.msg) {
      formValue.uname = name;
      formValue.reply = 'no reply yet';
      this.angularFire.list('/feedbacks')
      .push(formValue); // formvalue is pushed into the db

        // dialog box used as alert msg
        const data = 'Feedback Submitted!';
        this.dialog.open(AlertBoxComponent, {data});
    }
    else {
        // dialog box used as alert msg
        const data = 'Please Enter Feedback!';
        this.dialog.open(AlertBoxComponent, {data});
    }
  }
  //not in use currently
  SendReply(val) {
    this.temp.reply = val.reply;
    this.angularFire.list('/feedbacks') // select node 'feedbacks
      .update(this.replyKey, {'reply': val.reply}); // update its reply key
        // dialog box used as alert msg
        const data = 'Success, Reply Sent!';
        this.dialog.open(AlertBoxComponent, {data});
  }

  // get the bookings for the current user, iterate through the items in the list and add each booking to our array 'bookings'
  viewUserBookings(key): any {
            this.item = this.angularFire.list('/bookings/' + key);
            this.item.subscribe((x) => {
                for (let i = 0; i < x.length; i++) {
                  this.bookings[i] = {
                    id: x[i].slotId,
                    user: key,
                    date: x[i].date,
                    start: x[i].start,
                    end: parseInt(x[i].start) + parseInt(x[i].duration) + 'AM',
                    duration: x[i].duration,
                    key: x[i].$key
                  };
              }
            });
    return this.bookings;
  }

    // get all of the bookings that are in the database, iterate through the items in the list and add each booking to our array 'bookings'
  viewAdminBookings(): any {
      this.userName = this.angularFire.list('/bookings');
      this.userName.subscribe((x) => {
              for (let i = 0; i < x.length; i++) {
                for (const k in x[i]) {
                    if (k === '$key') {
                      continue;
                    }
                    if (typeof x[i][k] !== 'function') {
                        this.bookings.push({
                          id: x[i][k].slotId,
                          user: x[i].$key,
                          date: x[i][k].date,
                          start: x[i][k].start,
                          end: parseInt(x[i][k].start) + parseInt(x[i][k].duration) + 'AM',
                          duration: x[i][k].duration,
                          key: k
                        });
                    }
                  }
              }
      });
      return this.bookings;
  }

  //delete the specified booking
  deleteBooking(currentObject) {
    this.item = this.angularFire.list('/bookings/' + currentObject.user); // user
    this.item.subscribe( x => this.item.remove(currentObject.key)); // node specified by the key is deleted from the db
  }
}

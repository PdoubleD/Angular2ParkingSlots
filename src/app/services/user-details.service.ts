import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Injectable()
export class UserDetailsService {

  username: string;
  type: string;
  go2home: boolean;
  x;

  //@select(['UserReducer', 'type'])
  user$: Observable<any>; // gets User State of the app
  //subscription = this.user$.subscribe(x => this.x = x);

  constructor() { }

  //if the user is signed out we set go2home to true and return the value, we can use this in the components that utilise the user-details service
  navigateToHome(): boolean {
    if (this.x === 'signedout' || this.x === undefined) {
      this.go2home = true;
    }
    return this.go2home;
  }

  
  userType(): string {
    if ( this.x !== 'signedout' &&  this.x !== undefined) {
      this.type = 'isUser'; // type of user
    }
    return this.type; // , this.username;
  }

  user(): string {
    if ( this.x !== 'signedout' &&  this.x !== undefined) {
      this.username = this.x.slice(0, this.x.indexOf('@')); // extracts username from email
     }
    return this.username;
  }

  firstname(value): string {
    const firstChar = value.uname.charAt(0); // get 1st char of name
    const capitalize = firstChar.toUpperCase(); // transformed into upperCase
    const uname = value.uname.replace(firstChar, capitalize); // replaced first char of name
    const space = uname.indexOf(' '); // get first name
    const firstname = uname.slice(0, space); // extract first name with 1st letter capital
    return firstname;
  }
}

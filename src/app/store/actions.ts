import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

@Injectable()
export class MyActions{

    // actions

    static SIGN_IN = 'SIGN_IN';
    static SIGN_UP = 'SIGN_UP';
    static SIGN_OUT = 'SIGN_OUT';

    constructor(private ngRedux: NgRedux<{}>) { }

    // action controllers

    signIn(status) {
        this.ngRedux.dispatch({ type: MyActions.SIGN_IN, payload: status });
    }

    signUp(status) {
        this.ngRedux.dispatch({ type: MyActions.SIGN_UP, payload: status });
    }

    signOut() {
        this.ngRedux.dispatch({ type: MyActions.SIGN_OUT, payload: 'signedout'  });
    }
}
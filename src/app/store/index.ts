import { NgRedux, select, DevToolsExtension } from 'ng2-redux';
import { combineReducers } from 'redux';
import { NgModule } from '@angular/core';

// Actions
import { MyActions } from './actions';
export { MyActions } from './actions';

// Reducer
import { UserReducer, initialUserState } from './reducers';

export interface IAppState {
    // TaskReducer: Object;
    UserReducer: Object;
}
export const AppReducer = combineReducers<IAppState>({
    UserReducer
});

@NgModule({
    providers: [ MyActions ] // actions
})
export class StoreModule {
    constructor(
        private ngRedux: NgRedux<{}>,
        private devTool: DevToolsExtension
    ) {
        this.ngRedux.configureStore(
            AppReducer,                 // MainReducer
            {},                         // initial state
            null,                       // middleware
            [devTool.isEnabled() ? devTool.enhancer() : f => f] // Enhancers
        );
    }
}
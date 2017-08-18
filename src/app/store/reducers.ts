export const initialUserState = {
        type: 'signedout',
        status: 'signedout'
};
export const UserReducer = function(state = initialUserState, action: { type: string, payload?: any}) {
    switch (action.type) {
        case 'SIGN_IN':
            return Object.assign({}, state, { type: action.payload });
        case 'SIGN_UP':
            return Object.assign({}, state, { type: action.payload });
        case 'SIGN_OUT':
            return Object.assign({}, state, { type: action.payload });
        default:
            return state;
    }
};
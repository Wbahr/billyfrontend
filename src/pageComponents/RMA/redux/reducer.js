import * as c from './actionConsts'

const initialState = {
    rmaOrders: {},
    rmaStatus: ''
}

export default (state = initialState, { type, data = '' }) => {
    switch (type) {
    case c.RECEIVE_TESTING:
        return {
            ...state,
            rmaOrders: data,
            rmaStatus: 'PASSED'
        }
    default:
        return state
    }
}

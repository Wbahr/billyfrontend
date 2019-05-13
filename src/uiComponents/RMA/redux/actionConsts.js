export const REQUEST_TESTING = 'REQUEST_TESTING'
export const RECEIVE_TESTING = 'RECEIVE_TESTING'

export const requestTesting = () => ({ type: REQUEST_TESTING })
export const receiveTesting = text => ({ type: RECEIVE_TESTING , text})

import { combineReducers } from 'redux'

import rmaReducer from '../uiComponents/RMA/redux/reducer'

export default combineReducers({
  returnMaterialAuthorization: rmaReducer
})

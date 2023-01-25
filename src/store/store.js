import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.slice'
import housesReducer from './houses.slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    houses: housesReducer,
  },
})

export default store

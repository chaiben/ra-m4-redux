import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'marçal',
  surnames: {
    first: 'chaiben',
    second: 'machado',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload
    },
    updateFirstSurname: (state, action) => {
      state.surnames.first = action.payload
    },
    updateSecondSurname: (state, action) => {
      state.surnames.second = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateName, updateFirstSurname, updateSecondSurname } =
  userSlice.actions

export default userSlice.reducer

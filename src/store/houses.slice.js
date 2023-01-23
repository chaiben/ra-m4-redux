import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../constants'

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async () => {
    const res = await fetch(urls.houses)
    const data = await res.json()
    return data
  }
)

const intersection = (arr1, arr2) => {
  return arr1.filter((element) => {
    return arr2.indexOf(element) !== -1
  })
}

const initialState = {
  reqStatus: 'initial',
  houses: {
    byId: {},
    allIds: [],
    type: {},
    city: {},
    filters: {},
    filteredIds: []
  }
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.houses.filters = action.payload

      if (Object.keys(state.houses.filters).length) {
        for (const [filter, value] of Object.entries(state.houses.filters)) {
          state.houses.filteredIds = !state.houses.filteredIds.length
            ? state.houses[filter][value]
            : intersection(state.houses.filteredIds, state.houses[filter][value])
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state, action) => {
      state.reqStatus = 'loading'
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      action.payload.forEach(house => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)
          // type
          if (state.houses.type[house.type] === undefined) {
            state.houses.type[house.type] = [house.id]
          } else {
            state.houses.type[house.type].push(house.id)
          }
          // city
          if (state.houses.city[house.city] === undefined) {
            state.houses.city[house.city] = [house.id]
          } else {
            state.houses.city[house.city].push(house.id)
          }
        }
      })
    })
    builder.addCase(getHouses.rejected, (state, action) => {
      state.reqStatus = 'failed'
    })
  }
},)

// Action creators are generated for each case reducer function
export const { updateFilters } = housesSlice.actions

export default housesSlice.reducer
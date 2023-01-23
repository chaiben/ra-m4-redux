import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../constants'
import { intersection, removeEmptyAttributes } from '../helpers'

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (options = { page: 1, limit: 9 }) => {
    const { page, limit } = options
    const res = await fetch(`${urls.houses}?_page=${page}&_limit=${limit}`)
    const body = await res.json()
    const counterItems = await res.headers.get('X-Total-Count')
    const hasMore = page * limit <= counterItems
    return { body, hasMore }
  },
)

const initialState = {
  reqStatus: 'initial',
  hasMore: true,
  houses: {
    byId: {},
    allIds: [],
    type: {},
    city: {},
    filters: {},
    filteredIds: [],
  },
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.houses.filters = removeEmptyAttributes(action.payload)
      state.houses.filteredIds = []
      if (Object.keys(state.houses.filters).length) {
        Object.keys(state.houses.filters).forEach((filter) => {
          const value = state.houses.filters[filter]
          state.houses.filteredIds = !state.houses.filteredIds.length
            ? state.houses[filter][value]
            : intersection(
                state.houses.filteredIds,
                state.houses[filter][value],
              )
        })
      } else {
        state.houses.filteredIds = state.houses.allIds
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = 'loading'
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      state.hasMore = action.payload.hasMore
      action.payload.body.forEach((house) => {
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
      if (!Object.keys(state.houses.filters).length) {
        state.houses.filteredIds = state.houses.allIds
      }
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
    })
  },
})

// Action creators are generated for each case reducer function
export const { updateFilters } = housesSlice.actions

export default housesSlice.reducer

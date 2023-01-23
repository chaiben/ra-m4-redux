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
    filters: {}
  },
}

export const filteredIds = (stateHouse) => {
  let filteredIds = []
  const filters = removeEmptyAttributes(stateHouse.filters)

  if (Object.keys(filters).length) {
    Object.keys(filters).forEach((filter) => {
      const value = filters[filter]
      filteredIds = !filteredIds.length
        ? stateHouse[filter][value]
        : intersection(
          filteredIds,
          stateHouse[filter][value],
        )
    })
    console.log('filteredIds', filteredIds)
    return filteredIds
  } else {
    return stateHouse.allIds
  }
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.houses.filters = removeEmptyAttributes(action.payload)
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
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
    })
  },
})

// Action creators are generated for each case reducer function
export const { updateFilters } = housesSlice.actions

export default housesSlice.reducer

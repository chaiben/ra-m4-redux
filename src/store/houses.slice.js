import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../constants'
import { intersection, removeEmptyAttributes } from '../helpers'

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (options = { page: 1, limit: 9 }, { rejectWithValue }) => {
    const { page, limit } = options
    try {
      const res = await fetch(`${urls.houses}?_page=${page}&_limit=${limit}`)
      const body = await res.json()
      const counterItems = await res.headers.get('X-Total-Count')
      const hasMore = page * limit <= counterItems
      return { body, hasMore }
    } catch (err) {
      console.log('Error to load houseList: ', err)
      return rejectWithValue("Error to load houseList")
    }
  },
)

const initialState = {
  reqStatus: 'initial',
  isError: false,
  isSuccess: false,
  isLoading: false,
  hasMore: true,
  houses: {
    byId: {},
    allIds: [],
    byType: {},
    byCity: {},
  },
  filters: {
    city: null,
    type: null
  }
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setCity: (state, action) => {
      (action.payload) ? state.filters.city = state.houses.byCity[action.payload] : state.filters.city = null
    },
    setType: (state, action) => {
      (action.payload) ? state.filters.type = state.houses.byType[action.payload] : state.filters.type = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = 'loading'
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.hasMore = action.payload.hasMore

      action.payload.body.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)

          if (state.houses.byType[house.type] === undefined) {
            state.houses.byType[house.type] = [house.id]
          } else {
            state.houses.byType[house.type].push(house.id)
          }

          if (state.houses.byCity[house.city] === undefined) {
            state.houses.byCity[house.city] = [house.id]
          } else {
            state.houses.byCity[house.city].push(house.id)
          }
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = 'failed'
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
    })
  },
})

// Action creators are generated for each case reducer function
export const { setCity, setType } = housesSlice.actions

export default housesSlice.reducer

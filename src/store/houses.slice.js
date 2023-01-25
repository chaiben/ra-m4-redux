import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../constants'

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  // eslint-disable-next-line default-param-last
  async (options = { page: 1, limit: 9 }, { rejectWithValue }) => {
    const { page, limit } = options
    try {
      const res = await fetch(`${urls.houses}?_page=${page}&_limit=${limit}`)
      const body = await res.json()
      const counterItems = await res.headers.get('X-Total-Count')
      const hasMore = page * limit <= counterItems
      return { body, hasMore }
    } catch (err) {
      return rejectWithValue('Error to load houseList')
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
    filterByType: null,
    filterByCity: null,
    cities: [],
    types: [],
  },
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.houses.filterByCity = action.payload ? action.payload : null
    },
    setType: (state, action) => {
      state.houses.filterByType = action.payload ? action.payload : null
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

          if (!state.houses.types.includes(house.type)) {
            state.houses.types.push(house.type)
          }

          if (!state.houses.cities.includes(house.city)) {
            state.houses.cities.push(house.city)
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

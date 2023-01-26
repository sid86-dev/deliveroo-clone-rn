import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    restaurant: {
        id: null,
        title: null,
        imgUrl: null,
        address: null,
        short_description: null,
        dishes: null,
        genre: null,
        rating: null,
        long: null,
        lat: null,
    },
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions

export const selectRestaurant = state => state.restaurant.restaurant;

export default restaurantSlice.reducer
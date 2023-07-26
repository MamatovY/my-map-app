import { createSlice } from '@reduxjs/toolkit';

const routesSlice = createSlice({
    name: 'routes',
    initialState: {
        routes: [
            [
                [59.84660399, 30.29496392],
                [59.82934196, 30.42423701],
                [59.83567701, 30.38064206],
            ],
            [
                [59.82934196, 30.42423701],
                [59.82761295, 30.41705607],
                [59.84660399, 30.29496392],
            ],
            [
                [59.83567701, 30.38064206],
                [59.84660399, 30.29496392],
                [59.82761295, 30.41705607],
            ],
        ],
        selectedRoute: null,
    },
    reducers: {
        selectRoute: (state, action) => {
            state.selectedRoute = action.payload;
        },
    },
});

export const { selectRoute } = routesSlice.actions;

export default routesSlice.reducer;

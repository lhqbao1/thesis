import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
    },
};

export const accountLecturerSlice = createSlice({
    name: 'accountLecturer',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // doLoginAction: (state, action) => {
        //     state.isAuthenticated = true;
        //     state.isLoading = false;
        //     state.user = action.payload;
        // },
        doGetAccountLecturerAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },

        doLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;

            state.user = {
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }


        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {

    },
});

export const { doGetAccountLecturerAction, doLogoutAction } = accountLecturerSlice.actions;



export default accountLecturerSlice.reducer;

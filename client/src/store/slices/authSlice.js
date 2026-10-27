import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated:false,
    initialized:false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        markAuthenticated: (state) => {
            state.isAuthenticated = true;
            state.initialized = true;
        },
        unmarkAuthenticated: (state) => {
            state.isAuthenticated = false;
            state.initialized = true;
        },
        setInitialized: (state) => {
            state.initialized = true;
        }
    }
});

export const {markAuthenticated,unmarkAuthenticated,setInitialized} = authSlice.actions;
export const markUnauthenticated = unmarkAuthenticated;
export default authSlice.reducer;
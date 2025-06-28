import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { manageSlice } from './manage';
import { loginSlice } from './loginSlice';
const store=configureStore({
    reducer:{
auth:authSlice.reducer,
manage:manageSlice.reducer,
login:loginSlice.reducer
    }
})
export default store;
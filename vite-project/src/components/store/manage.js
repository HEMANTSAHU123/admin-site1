import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref,push,remove ,update} from 'firebase/database';
import {realtimedatabase } from '../firebase/firebase';
import { get } from 'firebase/database';
export const fetchmanage = createAsyncThunk(
  'manage/fetchmanage',
  async (_, { getState }) => {
    const user = getState().auth.user;
    if (user?.uid) {
      const manageref = ref(realtimedatabase, `user/${user.uid}/manage`);
      try {
        const snapshot = await get(manageref); 
        const data = snapshot.val();
        const managedata = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        console.log(manageref);
        return managedata;
      } catch (error) {
        console.error("Failed to fetch manage data:", error);
        throw error; 
      }
    }
    return [];
  }
);
export const addetails = createAsyncThunk('manage/adddetails', async (detailsdata, { getState }) => {
  const user = getState().auth.user;
  try{
  if (user?.uid) {
    console.log(user.uid)
    const manageref = ref(realtimedatabase, `user/${user.uid}/manage`); 
    console.log(manageref)
    const newmanageref = await push(manageref, detailsdata); 
   
    return {
      id: newmanageref.key,
      ...detailsdata
    };
  }
  throw new Error('User not authenticated');
}
catch(error){
  console.log(error.message)
}
});

 export const deletedata = createAsyncThunk('manage/deletedata', async (manageId, { getState }) => {
  const user = getState().auth.user;
  if (user?.uid) {
    const manageref = ref(realtimedatabase, `user/${user.uid}/manage/${manageId}`); 
    await remove(manageref); 
    return manageId;
  }
  throw new Error('User not authenticated');
});

export const updatemanage = createAsyncThunk('manage/updatemanage', async ({ id, updateddata }, { getState }) => {
  const user = getState().auth.user;
  if (user?.uid) {
    const manageref = ref(realtimedatabase, `user/${user.uid}/manage/${id}`);  
    await update(manageref, updateddata); 
    return {
      id,
      ...updateddata
    };
  }
  throw new Error('User not authenticated');
});

export const manageSlice = createSlice({
  name: 'manage',
  initialState: {
    manage: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchmanage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchmanage.fulfilled, (state, action) => {
        state.loading = false;
        state.manage = action.payload;
      })
      .addCase(fetchmanage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
       state.manage=[]
      })
      .addCase(addetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addetails.fulfilled, (state, action) => {
        state.loading = false;
        state.manage.push(action.payload);
        console.log('working')
      })
      .addCase(addetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletedata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletedata.fulfilled, (state, action) => {
        state.loading = false;
        state.manage = state.manage.filter(item => item.id !== action.payload);
      })
      .addCase(deletedata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatemanage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatemanage.fulfilled, (state, action) => {
        state.loading = false;
        state.manage = state.manage.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updatemanage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



